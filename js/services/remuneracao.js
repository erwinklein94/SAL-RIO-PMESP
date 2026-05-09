/* Módulo organizado por responsabilidade — Cálculos e renderização da remuneração tabelada.
   Mantém a ordem original para preservar compatibilidade. */

/* === REMUNERAÇÃO TABELADA =================================== */
/* ============================================================ */
/* BLOCO 15.8.1 — Tabela simples gratuita de remuneração bruta com fontes oficiais */
const REMUNERACAO_FONTES_OFICIAIS = {
  pmac: {
    nome: 'Portal do Estado do Acre — tabelas salariais PMAC/CBMAC e Edital FGV PMAC 2023',
    url: 'https://estado.ac.gov.br/tabelas-salariais/'
  },
  bmac: {
    nome: 'Portal do Estado do Acre e ALEAC — estrutura remuneratória PMAC/CBMAC; LC AC 349/2018, LC AC 164/2006, Lei AC 2.009/2008 e editais CBMAC/IBFC',
    url: 'https://estado.ac.gov.br/servidor-publico/legislacao-e-pccr/legislacao-e-pccr-diretas/'
  },
  pmal: {
    nome: 'PMAL — Edital nº 1/2026/Cebraspe para Soldado-Aluno, Soldado, Cadete e Aspirante; Lei AL nº 7.580/2014, Anexo IV, para estimativas por posto/graduação; Lei AL nº 9.852/2026 e SPSM/AL — Lei AL nº 8.671/2022',
    url: 'https://www.cebraspe.org.br/concursos/pm_al_26'
  },
  pcal: {
    nome: 'PCAL — Leis AL nº 6.276/2001, nº 6.277/2001 e nº 7.602/2014 para Agente/Escrivão; Lei AL nº 8.641/2022 para Delegado; Lei AL nº 9.551/2025 revisão geral; valores sem tabela consolidada 2026 marcados como estimados',
    url: 'https://gestaointegrada.seplag.al.gov.br/'
  },
  bmal: {
    nome: 'CBMAL, Transparência/AL e SAPL/ALEAL — Lei AL 7.580/2014, Lei AL 7.581/2014, Lei AL 8.668/2022 e revisões gerais até a Lei AL 9.852/2026; tabela exibida como estimativa técnica de maio/2026',
    url: 'https://www.cbm.al.gov.br/paginas/legislacao'
  },
  bmam: {
    nome: 'CBMAM, Legisla.AM e ALEAM/SAPL — Lei AM 3.725/2012 atualizada pela Lei AM 7.445/2025; tabela de remuneração PM/BM com efeitos financeiros em 01/12/2025',
    url: 'https://sapl.al.am.leg.br/media/sapl/public/normajuridica/2025/13902/7445.pdf'
  },
  bmap: {
    nome: 'CBMAP, SEAD/AP e Diário Oficial do Amapá — LC AP nº 113/2018 alterada pela LC AP nº 173/2025; Tabela de Progressão Horizontal 2026 I, vigente a partir de 01/04/2026',
    url: 'https://editor.amapa.gov.br/arquivos_portais/publicacoes/SEAD_6df4154451d39fe1495462a15d40471c.pdf'
  },
  pcac: {
    nome: 'Portal do Estado do Acre — tabelas salariais PCAC (Lei 2.250/3.228, LC 303 e Lei 3.107)',
    url: 'https://estado.ac.gov.br/tabelas-salariais/'
  },
  ppac: {
    nome: 'SEAD/IAPEN-AC — Edital 001/2023 e Portal do Estado do Acre — tabela IAPEN',
    url: 'https://sead.ac.gov.br/gestao-governamental/editais-e-concursos/iapen-instituto-de-administracao-penitenciaria-do-acre/'
  },
  pmesp: {
    nome: 'SGGD/SP — Área Policial — PMESP — total julho/2025; Lei SP 18.441/2026 atualiza vencimentos-base desde 01/04/2026',
    url: 'https://www.sggd.sp.gov.br/sgp/normas_e_legislacao/policial'
  },
  bmsp: {
    nome: 'SGGD/SP — Área Policial — CBPMESP/BMSP — usa tabela PMESP por posto/graduação; total julho/2025; Lei SP 18.441/2026 atualiza vencimentos-base desde 01/04/2026',
    url: 'https://www.sggd.sp.gov.br/sgp/normas_e_legislacao/policial'
  },
  pcsp: {
    nome: 'SGGD/SP — Área Policial — PCSP — total julho/2025; Lei SP 18.441/2026 atualiza vencimentos-base desde 01/04/2026',
    url: 'https://www.sggd.sp.gov.br/sgp/normas_e_legislacao/policial'
  },
  pmerj: {
    nome: 'GESPERJ/RJ — Caderno de Remuneração — janeiro/2026 — SEPM',
    url: 'https://www.rj.gov.br/gesperj/sites/default/files/Caderno%20de%20Remunera%C3%A7%C3%A3o%20-%20janeiro%20-%202026.pdf'
  },
  bmrj: {
    nome: 'GESPERJ/RJ — Caderno de Remuneração — janeiro/2026 — SEDEC/CBMERJ',
    url: 'https://www.rj.gov.br/gesperj/sites/default/files/Caderno%20de%20Remunera%C3%A7%C3%A3o%20-%20janeiro%20-%202026.pdf'
  },
  pcerj: {
    nome: 'GESPERJ/RJ — Caderno de Remuneração — janeiro/2026 — SEPOL',
    url: 'https://www.rj.gov.br/gesperj/sites/default/files/Caderno%20de%20Remunera%C3%A7%C3%A3o%20-%20janeiro%20-%202026.pdf'
  },
  pmmg: {
    nome: 'MG/SEPLAG — Grupo XI — Atividades da Defesa Social — Lei nº 25.804/2026',
    url: 'https://www.mg.gov.br/system/files/media/planejamento/documento_detalhado/2026/grupo_11_atualizacao-54-2026.pdf'
  },
  bmmg: {
    nome: 'MG/SEPLAG — Grupo XI — Defesa Social — Lei MG nº 25.804/2026; CBMMG Editais nº 09/2026 e nº 10/2026 — remuneração 2026',
    url: 'https://www.mg.gov.br/system/files/media/planejamento/documento_detalhado/2026/grupo_11_atualizacao-54-2026.pdf'
  },
  pcmg: {
    nome: 'MG/SEPLAG — Grupo XI — Atividades da Defesa Social — Lei nº 25.804/2026',
    url: 'https://www.mg.gov.br/system/files/media/planejamento/documento_detalhado/2026/grupo_11_atualizacao-54-2026.pdf'
  },
  pmba: {
    nome: 'Casa Civil/BA — Lei nº 14.890/2025 — soldo, GAP e auxílio fardamento',
    url: 'https://www.legislabahia.ba.gov.br/documentos/lei-no-14890-de-05-de-maio-de-2025'
  },
  bmba: {
    nome: 'Casa Civil/BA e DOE/BA — Lei nº 14.890/2025 — soldo, GAP e auxílio-fardamento do CBMBA; efeitos financeiros em 01/05/2026 e 01/06/2026',
    url: 'https://cdn.atarde.com.br/img/attachmentinline/1310000/Jeronimo-sanciona-lei-de-reajuste-salarial-para-po0131683500202505060933.pdf?xid=6642146'
  },
  pcba: {
    nome: 'Casa Civil/BA — Lei nº 14.891/2025 — vencimento, GAJ e GAPJ',
    url: 'https://www.legislabahia.ba.gov.br/documentos/lei-no-14891-de-05-de-maio-de-2025'
  },
  pmpr: {
    nome: 'Legislação/PR — Lei nº 22.187/2024 e Lei nº 22.208/2024',
    url: 'https://www.legislacao.pr.gov.br/legislacao/exibirAto.do?action=iniciarProcesso&codAto=344946&codItemAto=2177446'
  },
  bmpr: {
    nome: 'Administração/PR — Carreiras e Tabelas Salariais — Quadro PMPR e Quadro Bombeiro Militar PR — Lei PR nº 22.187/2024; auxílio-alimentação Lei PR nº 22.208/2024',
    url: 'https://www.administracao.pr.gov.br/Recursos-Humanos/Pagina/Carreiras-e-Tabelas-Salariais'
  },
  pcpr: {
    nome: 'Legislação/PR — Lei Complementar nº 259/2023 e Lei nº 22.208/2024',
    url: 'https://www.legislacao.pr.gov.br/legislacao/pesquisarAto.do?action=exibir&codAto=300584&dt=27.1.2024.16.42.52.571&indice=1&totalRegistros=1'
  },
  pmrs: {
    nome: 'Governo do RS/RHE — Relação de Remuneração — competência 11/2025; editais BMRS 2025 para ingresso',
    url: 'https://tesouro-admin.fazenda.rs.gov.br/upload/arquivos/202512/12090345-cargos-venc-gov3032-112025.pdf'
  },
  pcrs: {
    nome: 'Governo do RS/RHE — Relação de Remuneração — competência 11/2025; editais PCRS 2025 para ingresso',
    url: 'https://tesouro-admin.fazenda.rs.gov.br/upload/arquivos/202512/12090345-cargos-venc-gov3032-112025.pdf'
  },
  pmsc: {
    nome: 'ALESC/SC — LC 765/2020, LC 776/2021, LC 872/2025 e LC 880/2025 — PMSC',
    url: 'https://leis.alesc.sc.gov.br/ato-normativo/20899'
  },
  pcsc: {
    nome: 'ALESC/SC — LC 765/2020, LC 776/2021 e LC 872/2025; PCSC editais 2025',
    url: 'https://pc.sc.gov.br/?p=35166'
  },
  pmes: {
    nome: 'PMES/ES — LC 420/2007, legislação PMES e tabela PM/CBM a partir de 01/12/2025',
    url: 'https://pm.es.gov.br/legislacao'
  },
  bmes: {
    nome: 'CBMES/ES — tabela PM/CBM a partir de 01/12/2025; LC ES 420/2007; Lei ES 11.985/2023; Lei ES 12.783/2026 para oficiais superiores; Edital CFO CBMES 001/2026',
    url: 'https://cb.es.gov.br/cfo2023'
  },
  pces: {
    nome: 'PCES/ES — LC 1.093/2024, concurso OIP 2025, tabelas de Delegado e PCIES/Perícia Oficial',
    url: 'https://pc.es.gov.br/Media/PCES/Legisla%C3%A7%C3%A3o/LC_%20n_%201093_cria_OIP.pdf'
  },
  pmms: {
    nome: 'PMMS — Tabela salarial militar MS 05/2025, com reajuste de 5,06% aplicado',
    url: 'https://ronda.org.br/assembleia-aprova-reajuste-de-506-aos-servidores-de-ms-confira-a-tabela-salarial-da-pm-e-bm/'
  },
  bmms: {
    nome: 'CBMMS — Subsídio militar estadual por posto/graduação e nível; LC MS 127/2008, LC MS 291/2021, tabela militar 05/2025 e RGA 3,81% da Lei MS 6.562/2026',
    url: 'https://legislacao.bombeiros.ms.gov.br/tabelas-de-subsidios/'
  },
  bmmt: {
    nome: 'CBMMT/MT — LC MT 541/2014; Lei MT 12.007/2023; LC MT 775/2023; Edital SEPLAG/SESP/CBMMT nº 007/2022; Lei MT 13.220/2026 para RGA 2026',
    url: 'https://www.bombeiros.mt.gov.br/legislacao'
  },
  pcms: {
    nome: 'PCMS — Edital APJ/2025; LC MS nº 343/2024; LC MS nº 290/2021 para Delegado',
    url: 'https://www.pc.ms.gov.br/governo-de-mato-grosso-do-sul-abre-concurso-publico-com-400-vagas-para-a-policia-civil/'
  },
  pcms_apj2025: {
    nome: 'PCMS — Edital APJ/2025 — 400 vagas, APJ 40h',
    url: 'https://www.pc.ms.gov.br/governo-de-mato-grosso-do-sul-abre-concurso-publico-com-400-vagas-para-a-policia-civil/'
  },
  pcms_lc343: {
    nome: 'PCMS — LC MS nº 343/2024 — Tabelas A, B e C com vigência 01/01/2025',
    url: 'https://dhg1h5j42swfq.cloudfront.net/2024/12/18174426/diariooficial-2.pdf'
  },
  pcms_lc290: {
    nome: 'PCMS — LC MS nº 290/2021 — Tabela D de Delegado',
    url: 'https://www.cgp.sejusp.ms.gov.br/wp-content/uploads/2022/12/DO10711_17_12_2021-pag-02-07-1.pdf'
  },
  ppms: {
    nome: 'AGEPEN/MS — Tabela Subsídio Polícia Penal 2026 — Lei MS nº 6.562/2026',
    url: 'https://www.agepen.ms.gov.br/wp-content/uploads/2025/12/Tabela-Subsidio-AGEPEN-2026.pdf'
  },
  pmmt: {
    nome: 'PMMT — Planilha de vencimentos LC MT nº 541/2014 e Lei MT nº 12.007/2023',
    url: 'https://site.cabosesoldadosmt.com.br/assets/pdf/tabelasalarial.pdf'
  },
  pcmt: {
    nome: 'PCMT/PJC-MT — Portal do Servidor/SEPLAG-MT — tabela salarial 40h 2025',
    url: 'https://dhg1h5j42swfq.cloudfront.net/2025/07/16180311/tabela-salarial-pc-mt.pdf'
  },
  ppmt: {
    nome: 'PPMT — Portal do Servidor/SEPLAG-MT — tabela 40h Policial Penal 2026',
    url: 'https://sites.diretasistemas.com.br/sites/1377/wp-content/uploads/2026/02/10103833/Portal-do-Servidor.pdf'
  },
  ppsp: {
    nome: 'PPSP — SGGD/SP — tabela oficial da área penitenciária julho/2025; LC SP 1.416/2024 e LC SP 1.425/2025',
    url: 'https://www.sggd.sp.gov.br/sgp/normas_e_legislacao/penitenciaria'
  },
  pf: {
    nome: 'Lei nº 14.875/2024, Anexo XXVI — subsídio da Carreira Policial Federal com efeitos em 01/05/2026; MGI/Gov.br — benefícios federais 2026; PF/Gov.br — servidores e concursos',
    url: 'https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/lei/l14875.htm'
  },
  prf: {
    nome: 'Lei nº 14.875/2024, Anexo XXVII — subsídio PRF com efeitos em 01/05/2026; PRF/Gov.br — carreira e Portal da Transparência',
    url: 'https://www.gov.br/prf/pt-br/acesso-a-informacao/servidores/carreira-prf'
  },
  pprj: {
    nome: 'PPRJ — GESPERJ/RJ — Caderno de Remuneração janeiro/2026 — SEAP/Polícia Penal',
    url: 'https://www.rj.gov.br/gesperj/sites/default/files/Caderno%20de%20Remunera%C3%A7%C3%A3o%20-%20janeiro%20-%202026.pdf'
  },
  ppmg: {
    nome: 'PPMG — SEJUSP/MG — Edital nº 01/2025 e tabela da carreira de Policial Penal',
    url: 'https://depen.seguranca.mg.gov.br/images/2025/SEI_124235863_Edital_01_2025.pdf'
  },
  ppba: {
    nome: 'PPBA — SEAP/BA — Edital nº 02/2024, remuneração de Agente Penitenciário/Policial Penal',
    url: 'https://www.ba.gov.br/seap/'
  },
  pppr: {
    nome: 'PPPR — ALEP/PR — LC PR 245/2022 e LC PR 283/2025 — subsídio do QPPP',
    url: 'https://www.assembleia.pr.leg.br/storage/ccj/208dlCXRFOeEMxdtVDrKxlRxAY9MelrYJIyyrkPM.pdf'
  },
  pprs: {
    nome: 'PPRS — Tesouro/RS — Relações de Remuneração RHE e LC RS 16.449/2025',
    url: 'https://tesouro-admin.fazenda.rs.gov.br/upload/arquivos/202512/12090345-cargos-venc-gov3032-112025.pdf'
  },
  ppsc: {
    nome: 'PPSC — ALESC — LC SC 774/2021 e atualização remuneratória 2025/2026',
    url: 'https://leis.alesc.sc.gov.br/ato-normativo/21250'
  },
  bmsc: {
    nome: 'CBMSC/SC — LC SC 765/2020, LC SC 872/2025 e LC SC 880/2025; CBMSC/IDIB — editais CFP/CFO 2026',
    url: 'https://leis.alesc.sc.gov.br/ato-normativo/22843'
  },
  ppes: {
    nome: 'PPES — SEGER/ES e PPES — Edital nº 001/2025, LC ES 1.059/2023 e tabela da carreira',
    url: 'https://seger.es.gov.br/concurso-ppes-edital-no-01-2025-policial-penal'
  },
  sc_auxilio: {
    nome: 'ALESC/SC — Lei 18.796/2023, redação da Lei 19.059/2024 — auxílio-alimentação',
    url: 'https://leis.alesc.sc.gov.br/ato-normativo/22251'
  },
  pr_auxilio: {
    nome: 'Legislação/PR — auxílio-alimentação de R$ 834,74',
    url: 'https://www.legislacao.pr.gov.br/legislacao/pesquisarAto.do?action=exibir&codAto=257965&indice=1'
  },
  mg_auxilio: {
    nome: 'ALMG — Decreto nº 49.006/2025 — ajuda de custo para alimentação',
    url: 'https://www.almg.gov.br/legislacao-mineira/texto/DEC/49006/2025/'
  }
};

function linhaRemuneracaoOficial(cargo, remuneracao, beneficios, criterio, benefDesc, fonteKey, badge = 'Fonte oficial') {
  const valor = Number(remuneracao || 0);
  return { cargo, remuneracao: valor, beneficios: 0, total: valor, criterio, benefDesc, fonteKey, badge, valorPendente: valor <= 0 };
}

function getAdicionaisRemuneracaoResumo(inst, linha = {}) {
  inst = normalizarInstituicao(inst);
  const cargo = String(linha.cargo || '').toLowerCase();

  if (isPoliciaPenal(inst)) {
    const info = getInfoPoliciaPenal(inst);
    const detalhesLinha = linha.benefDesc ? `${linha.benefDesc} ` : '';
    return `${detalhesLinha}${info.sigla}: ${info.atribuicoes} ${info.vantagens} Fonte principal: ${info.fonte}.`;
  }

  if (inst === 'pmal') {
    return linha.benefDesc || 'PMAL: regime de subsídio por posto/graduação e nível. Soldado-Aluno, Soldado, Cadete e Aspirante vêm do edital PMAL 2026; demais linhas marcadas como “estimado” usam projeção técnica a partir da Lei AL 7.580/2014 e devem ser confirmadas no DOE/AL, SEPLAG/AL, transparência e contracheque. SPSM/AL, serviço voluntário, Força Tarefa, diárias, indenizações e parcelas pessoais não foram somados automaticamente.';
  }
  if (inst === 'pcal') {
    return linha.benefDesc || 'PCAL: regime de subsídio por cargo, classe, nível e referência. Delegado segue tabela própria da Lei AL 8.641/2022; Agente e Escrivão usam carreira estruturada pelas Leis AL 6.276/2001, 6.277/2001 e 7.602/2014. Valores marcados como estimado devem ser conferidos no DOE/AL, SEPLAG/AL, Gestão Integrada, transparência e contracheque. Plantões, acúmulo extraordinário, adicionais e parcelas pessoais não foram somados automaticamente.';
  }
  if (inst === 'bmms') {
    return linha.benefDesc || 'CBMMS: subsídio por posto/graduação e nível; SPSM/MS, AGEPREV/MS, ajuda de custo, fardamento, diárias, indenizações, função, escala e parcelas pessoais dependem da legislação estadual e do contracheque; não foram somados automaticamente.';
  }
  if (inst === 'pmms') {
    return linha.benefDesc || 'PMMS: adicionais, indenizações, auxílio, escala, fardamento ou verbas específicas dependem da legislação estadual, lotação, ordem de serviço, escala e contracheque; não foram somados automaticamente.';
  }
  if (inst === 'pcms') {
    return linha.benefDesc || 'PCMS: o edital APJ/2025 informou remuneração inicial de R$ 6.569,53 para 40h; abonos, adicionais, plantões e demais rubricas dependem da legislação estadual, lotação, escala e contracheque.';
  }
  if (inst === 'pmmt') {
    return linha.benefDesc || 'PMMT: adicionais, indenizações, etapas, auxílio, escala, fardamento e demais verbas específicas dependem da legislação estadual, lotação, ordem de serviço, escala e contracheque; não foram somados automaticamente.';
  }
  if (inst === 'pcmt') {
    return linha.benefDesc || 'PCMT: a tabela salarial cadastrada usa referências do Portal do Servidor/SEPLAG-MT para Escrivão e Delegado; abonos, adicionais, plantões e demais rubricas dependem da legislação estadual, lotação, escala e contracheque.';
  }

  if (inst === 'bmsp') {
    const representacao = /(comandante|coronel|cel|ten cel)/i.test(linha.cargo || '')
      ? ' Gratificação de representação: pode existir para postos/funções específicas e já aparece incorporada quando constar na fonte oficial.'
      : '';
    return `Tabela total oficial SGGD/SP com referência julho/2025, aplicada aos bombeiros militares por posto/graduação da PMESP. RETP, quando aplicável, já está considerada no bruto oficial desta tabela. A Lei SP 18.441/2026 atualizou vencimentos-base desde 01/04/2026; não use o vencimento-base como total sem conferir tabela posterior/holerite. DEJEM, quinquênio, sexta-parte, auxílio-alimentação, insalubridade, CBPM/Cruz Azul, diárias, ajuda de custo, transporte e demais rubricas dependem de situação funcional, laudo, escala, vínculo, designação e contracheque.${representacao}`;
  }

  if (inst === 'pmesp') {
    const representacao = /(cmt g|coronel|cel|ten cel)/i.test(linha.cargo || '')
      ? ' Gratificação de representação: pode existir para postos/funções específicas e já aparece incorporada quando constar na fonte oficial.'
      : '';
    return `Tabela total oficial com referência julho/2025. RETP, quando aplicável, já está considerada no bruto oficial desta tabela. A Lei SP 18.441/2026 atualizou vencimentos-base desde 01/04/2026; não use o vencimento-base como total sem conferir tabela posterior/holerite. Quinquênio, sexta-parte, auxílio-alimentação, insalubridade, CBPM/Cruz Azul e demais rubricas dependem de situação funcional, laudo, escala, vínculo e contracheque.${representacao}`;
  }

  if (inst === 'pcsp') {
    const carreiraDelegado = /delegado/i.test(linha.cargo || '');
    return `Tabela total oficial com referência julho/2025. RETP: em regra 100% sobre o padrão/vencimento-base, já considerado no bruto oficial desta tabela. A Lei SP 18.441/2026 atualizou vencimentos-base desde 01/04/2026; não use o vencimento-base como total sem conferir tabela posterior/holerite. ${carreiraDelegado ? 'Delegados podem ter ADPJ e verbas próprias de representação quando previstas. ' : ''}Quinquênio: 5% por período aquisitivo; sexta-parte: 1/6 após requisito temporal. DEJEC: eventual, condicionada à escala/autorização e limites da Lei 18.440/2026. Auxílio-alimentação: ${fmt(AUX_ALIM_SP_DIA_PADRAO)} por dia efetivamente trabalhado. IAMSPE e insalubridade dependem de contribuição, grau, laudo e enquadramento.`;
  }

  if (inst === 'pf') {
    const grupoSuperior = /delegado|perito/i.test(linha.cargo || '');
    const grupoOperacional = /agente|escrivão|escrivao|papiloscopista/i.test(linha.cargo || '');
    const grupo = grupoSuperior
      ? 'Grupo remuneratório Delegado/Perito: categorias Especial, Primeira, Segunda e Terceira, sem subdivisão por padrão na tabela legal.'
      : grupoOperacional
        ? 'Grupo remuneratório Agente/Escrivão/Papiloscopista: classes Especial, 1ª, 2ª e 3ª na tabela legal.'
        : 'Grupo remuneratório da Carreira Policial Federal conforme cargo e classe.';
    return `Regime de subsídio: valor bruto mensal da carreira policial federal com efeitos financeiros a partir de 01/05/2026, conforme Lei nº 14.875/2024, Anexo XXVI. ${grupo} Auxílio-alimentação federal: R$ 1.192,00, verba indenizatória não somada ao subsídio. Assistência pré-escolar: R$ 526,64 quando houver dependente elegível e requisitos no SIAPE/SouGov. Saúde suplementar: participação da União por faixa etária/remuneração, não somada automaticamente. Indenização de fronteira: R$ 91,00 por dia de efetivo trabalho somente em localidade estratégica e quando não houver incompatibilidade/cumulação vedada. Diárias, ajuda de custo, transporte, adicional de férias, gratificação natalina, abono de permanência, função e parcelas pessoais dependem de lotação, escala, missão, tempo de serviço e situação funcional.`;
  }


  if (inst === 'bmrj') {
    let gret = '150%';
    let ghp = '110%';
    if (/cel|ten cel|tenente-coronel/i.test(linha.cargo || '')) { gret = '192,5%'; ghp = '160%'; }
    else if (/maj/i.test(linha.cargo || '')) { gret = '192,5%'; ghp = /80%/.test(linha.cargo || '') ? '80%' : '110%'; }
    else if (/80%/.test(linha.cargo || '')) { ghp = '80%'; }
    else if (/cabo|cb bm|sd bm|soldado a\/b\/c/i.test(linha.cargo || '')) { ghp = '75%'; }
    else if (/aluno|soldado-aluno|sd aluno|esfo/i.test(linha.cargo || '')) { gret = '122,5%'; ghp = 'não aplicada na linha'; }
    return `GRET: ${gret} sobre o soldo; GHP: ${ghp}; GRAM: 62,5% sobre soldo + GRET + GHP. Total bruto oficial SEDEC/CBMERJ jan/2026 já inclui essas parcelas. Triênio: 10% a 60% quando preservado, conforme ingresso e LC RJ 194/2021, não somado na tabela. Auxílio-transporte: R$ 100,00/mês, não somado. SPSMERJ, PTTC, férias/licenças em pecúnia, diárias, indenizações e rubricas pessoais dependem de ato, escala, vínculo e contracheque.`;
  }

  if (inst === 'pmerj') {
    let gret = '150%';
    let ghp = '110%';
    if (/cel|ten cel/i.test(linha.cargo || '')) { gret = '192,5%'; ghp = '160%'; }
    else if (/maj/i.test(linha.cargo || '')) { gret = '192,5%'; ghp = '110%'; }
    else if (/cabo|sd pm|soldado a\/b\/c/i.test(linha.cargo || '')) { ghp = '75%'; }
    else if (/aluno|soldado-aluno|sd aluno|esfo/i.test(linha.cargo || '')) { gret = '122,5%'; ghp = 'não aplicada na linha'; }
    return `GRET: ${gret} sobre o soldo; GHP: ${ghp}; GRAM: 62,5% sobre soldo + GRET + GHP. Essas parcelas já compõem a remuneração bruta exibida. Auxílio-alimentação PMERJ: ${fmt(AUX_ALIM_RJ_PM)} mensais, sem somar no bruto.`;
  }

  if (inst === 'pcerj') {
    if (/delegado/i.test(linha.cargo || '')) {
      return 'Verba de representação: 212% sobre o vencimento-base; GHP: 105%. Essas parcelas já compõem a remuneração bruta exibida. Auxílio-alimentação: R$ 704,00/mês; auxílio-transporte: R$ 100,00/mês, sem somar no bruto.';
    }
    const gatc = /perito|médico|medico|eng\.?|telecomunicações|telecomunicacoes/i.test(linha.cargo || '')
      ? ' GATC: 100% sobre o vencimento-base quando aplicável ao cargo.'
      : ' GATC: pode existir quando prevista para o cargo/função.';
    return `AAP: 230% sobre o vencimento-base; GHP: até 100%.${gatc} Essas parcelas já compõem a remuneração bruta exibida quando aplicáveis. Auxílio-alimentação: R$ 704,00/mês; auxílio-transporte: R$ 100,00/mês, sem somar no bruto.`;
  }

  if (inst === 'pmmg' || inst === 'bmmg') {
    const siglaMg = inst === 'bmmg' ? 'CBMMG' : 'PMMG';
    return `${siglaMg}: ajuda de custo para alimentação de referência ${fmt(AUX_ALIM_MG_DIA_PADRAO)} por dia efetivamente trabalhado, quando atendidos os critérios. Abono fardamento, assistência IPSM, adicionais, indenizações, diárias, retroativos e parcelas pessoais dependem de função, escala, ato específico e contracheque; não foram somados ao bruto.`;
  }

  if (inst === 'pcmg') {
    return `Ajuda de custo para alimentação: ${fmt(AUX_ALIM_MG_DIA_PADRAO)} por dia efetivamente trabalhado, quando atendidos os critérios. Adicionais funcionais, gratificações ou indenizações específicas dependem de cargo, lotação, ato próprio ou situação individual e não foram somados ao bruto.`;
  }

  if (inst === 'pmba' || inst === 'bmba') {
    const ref = (linha.cargo || '').match(/GAP Ref\.\s*([IVX]+)/i)?.[1] || 'informada';
    return `GAP: gratificação por atividade policial/bombeiro militar na referência ${ref}, já considerada na remuneração bruta da linha. Auxílio-fardamento: R$ 256,18 mensais. Auxílio-alimentação: referência geral BA de ${fmt(AUX_ALIM_BA_40H)} para 40h ou ${fmt(AUX_ALIM_BA_30H)} para 30h, quando aplicável; CET, diárias, adicionais, função e parcelas pessoais não foram somados.`;
  }


  if (inst === 'pcba') {
    const verba = /delegado/i.test(linha.cargo || '') ? 'GAJ' : 'GAPJ';
    const ref = (linha.cargo || '').match(/Ref\.\s*([IVX]+)/i)?.[1] || 'informada';
    return `${verba}: gratificação da carreira na referência ${ref}, já considerada na remuneração bruta da linha. CET, GIP, GQUAL ou outras vantagens podem existir conforme função, titulação, lotação ou ato específico. Auxílio-alimentação: referência geral BA de ${fmt(AUX_ALIM_BA_40H)} para 40h ou ${fmt(AUX_ALIM_BA_30H)} para 30h, quando aplicável; não somado ao bruto.`;
  }

  if (inst === 'pmpr') {
    return `Regime por subsídio: a remuneração bruta da linha corresponde ao subsídio do cargo/classe. Auxílio-alimentação oficial PR: ${fmt(AUX_ALIM_PR_PADRAO)}. Outras indenizações ou gratificações específicas dependem de previsão própria, escala, local ou situação individual e não foram somadas.`;
  }

  if (inst === 'bmpr') {
    return `Regime por subsídio do CBMPR: a remuneração bruta da linha corresponde ao subsídio por posto/graduação e classe da Lei PR nº 22.187/2024. Auxílio-alimentação oficial PR: ${fmt(AUX_ALIM_PR_PADRAO)}, não somado automaticamente. FASPM é facultativo; ParanáPrevidência/proteção social militar, diárias, indenizações, serviço extraordinário e parcelas pessoais dependem de vínculo, escala, ato e contracheque.`;
  }

  if (inst === 'pcpr') {
    return `Regime por subsídio: o subsídio pode compreender adicionais como insalubridade, periculosidade e risco de vida, conforme LC PR 259/2023 e aplicação vigente. Auxílio-alimentação oficial PR: ${fmt(AUX_ALIM_PR_PADRAO)}. Verbas específicas/eventuais não foram somadas.`;
  }

  if (inst === 'pmrs') return `RHE/RS: linhas inicial e final por posto/graduação, com competência 11/2025. Editais BM/RS 2025: referências de ingresso para Soldado, Aluno-Oficial e Capitão. Auxílio-alimentação BM/RS: ${fmt(AUX_ALIM_RS_BM)} informado em edital; não somado automaticamente ao bruto.`;
  if (inst === 'pcrs') return 'Carreira PCRS: classes de Delegado, Escrivão, Inspetor e Comissário, com valores de referência dos editais/tabelas 2025 e conferência na relação RHE 11/2025. Adicionais/indenizações: dependem de rubrica, lotação, legislação e situação funcional; não são somados automaticamente.';
  if (inst === 'pmsc') return `Regime por subsídio da PMSC: valores atualizados pela LC SC 872/2025 e Soldado unificado pela LC SC 880/2025. Auxílio-alimentação SC de referência: ${fmt(AUX_ALIM_SC_PADRAO)}, verba indenizatória não somada ao bruto. Diárias, indenizações e eventuais serviços extraordinários dependem de escala, local, função ou situação funcional.`;
  if (inst === 'bmsc') return `Regime por subsídio do CBMSC: valores por posto/graduação; linhas com “(estimado)” usam equivalência com a tabela dos militares estaduais de SC e a etapa de 01/04/2026 da LC SC 872/2025. Auxílio-alimentação SC de referência: ${fmt(AUX_ALIM_SC_PADRAO)}, verba indenizatória não somada ao bruto. Diárias, indenizações, escalas especiais e rubricas pessoais dependem de ato, escala, lotação e contracheque.`;
  if (inst === 'bmes') return `Regime por subsídio do CBMES: tabela PM/CBM por posto/graduação e referências, com valores oficiais a partir de 01/12/2025; Coronel, Tenente-Coronel e Major recebem destaque da Lei ES 12.783/2026 quando selecionada a linha 2026. Auxílio-alimentação ES de referência: ${fmt(AUX_ALIM_ES_PADRAO)}, não somado automaticamente ao bruto. Gratificação de Serviço Extraordinário, fardamento, diárias, indenizações e rubricas pessoais dependem de escala, ato, lotação e contracheque.`;
  if (inst === 'bmmt') return linha.benefDesc || 'CBMMT: regime por subsídio dos militares estaduais de MT, com valores de referência da LC MT 541/2014/Lei MT 12.007/2023 e linhas oficiais do Edital 007/2022 para Aluno-a-Oficial e Aspirante. Etapa alimentação, fardamento, diárias, indenizações, temporários, PTTC e parcelas pessoais dependem de lei, escala, ato administrativo e contracheque; não foram somadas automaticamente.';
  if (inst === 'pcsc') return `Regime por subsídio da PCSC: classes de Delegado, Agente, Escrivão e Psicólogo Policial conforme legislação estadual. Auxílio-alimentação SC: ${fmt(AUX_ALIM_SC_PADRAO)}, já citado nos editais de Agente/Escrivão 2025, mas não somado automaticamente ao bruto.`;
  if (inst === 'pmes') return `Regime por subsídio da PMES: tabela PM/CBM por posto/graduação e referências, com base na LC ES 420/2007 e valores de referência a partir de 01/12/2025. Auxílio-alimentação ES de referência: ${fmt(AUX_ALIM_ES_PADRAO)}; não somado automaticamente ao bruto.`;
  if (inst === 'pces') return `Regime por subsídio da PCES: Delegado e Oficial Investigador por categorias/referências. Carreiras periciais aparecem sinalizadas como PCIES/Perícia Oficial após segregação institucional. Auxílio-alimentação ES de referência: ${fmt(AUX_ALIM_ES_PADRAO)}; não somado automaticamente ao bruto.`;
  if (inst === 'prf') return linha.benefDesc || 'PRF: subsídio federal por classe/padrão. Benefícios não somados: auxílio-alimentação federal, assistência à saúde suplementar por faixa, auxílio pré-escolar quando devido, adicional de fronteira quando houver exercício em localidade prevista, diárias e indenizações.';
  return linha.benefDesc || 'Adicionais e benefícios dependem de legislação, cargo, lotação, escala e situação individual; não foram somados ao bruto.';
}

const REMUNERACAO_SP_OFICIAL = {
  pmesp: [
    linhaRemuneracaoOficial('CMT G — Comandante Geral PM', 22587.35, 0, 'Salário inicial oficial: salário-base + RETP + gratificação de representação. Mês de referência: julho/2025; Lei SP 18.441/2026 atualizou vencimentos-base a partir de 01/04/2026, mas o total 2026 deve ser conferido em tabela oficial posterior.', 'Benefícios não somados; adicional de insalubridade e contribuição CBPM/Cruz Azul variam conforme classificação, vínculo e regra vigente.', 'pmesp'),
    linhaRemuneracaoOficial('CEL — Coronel PM', 18082.57, 0, 'Salário inicial oficial: salário-base + RETP + gratificação de representação. Mês de referência: julho/2025; Lei SP 18.441/2026 atualizou vencimentos-base a partir de 01/04/2026, mas o total 2026 deve ser conferido em tabela oficial posterior.', 'Benefícios não somados; adicional de insalubridade e contribuição CBPM/Cruz Azul variam conforme classificação, vínculo e regra vigente.', 'pmesp'),
    linhaRemuneracaoOficial('TEN CEL — Tenente Coronel PM', 16604.78, 0, 'Salário inicial oficial: salário-base + RETP + gratificação de representação. Mês de referência: julho/2025; Lei SP 18.441/2026 atualizou vencimentos-base a partir de 01/04/2026, mas o total 2026 deve ser conferido em tabela oficial posterior.', 'Benefícios não somados; adicional de insalubridade e contribuição CBPM/Cruz Azul variam conforme classificação, vínculo e regra vigente.', 'pmesp'),
    linhaRemuneracaoOficial('MAJ — Major PM', 15219.78, 0, 'Salário inicial oficial: salário-base + RETP. Mês de referência: julho/2025; Lei SP 18.441/2026 atualizou vencimentos-base a partir de 01/04/2026, mas o total 2026 deve ser conferido em tabela oficial posterior.', 'Benefícios não somados; adicional de insalubridade e contribuição CBPM/Cruz Azul variam conforme classificação, vínculo e regra vigente.', 'pmesp'),
    linhaRemuneracaoOficial('CAP — Capitão PM', 14384.64, 0, 'Salário inicial oficial: salário-base + RETP. Mês de referência: julho/2025; Lei SP 18.441/2026 atualizou vencimentos-base a partir de 01/04/2026, mas o total 2026 deve ser conferido em tabela oficial posterior.', 'Benefícios não somados; adicional de insalubridade e contribuição CBPM/Cruz Azul variam conforme classificação, vínculo e regra vigente.', 'pmesp'),
    linhaRemuneracaoOficial('1º TEN — 1º Tenente PM', 13332.24, 0, 'Salário inicial oficial: salário-base + RETP. Mês de referência: julho/2025; Lei SP 18.441/2026 atualizou vencimentos-base a partir de 01/04/2026, mas o total 2026 deve ser conferido em tabela oficial posterior.', 'Benefícios não somados; adicional de insalubridade e contribuição CBPM/Cruz Azul variam conforme classificação, vínculo e regra vigente.', 'pmesp'),
    linhaRemuneracaoOficial('2º TEN — 2º Tenente PM', 9046.74, 0, 'Salário inicial oficial: salário-base + RETP. Mês de referência: julho/2025; Lei SP 18.441/2026 atualizou vencimentos-base a partir de 01/04/2026, mas o total 2026 deve ser conferido em tabela oficial posterior.', 'Benefícios não somados; adicional de insalubridade e contribuição CBPM/Cruz Azul variam conforme classificação, vínculo e regra vigente.', 'pmesp'),
    linhaRemuneracaoOficial('ASP OF — Aspirante a Oficial PM', 8666.50, 0, 'Salário inicial oficial: salário-base + RETP. Mês de referência: julho/2025; Lei SP 18.441/2026 atualizou vencimentos-base a partir de 01/04/2026, mas o total 2026 deve ser conferido em tabela oficial posterior.', 'Benefícios não somados; adicional de insalubridade e contribuição CBPM/Cruz Azul variam conforme classificação, vínculo e regra vigente.', 'pmesp'),
    linhaRemuneracaoOficial('SUBTEN — Subtenente PM', 7363.88, 0, 'Salário inicial oficial: salário-base + RETP. Mês de referência: julho/2025; Lei SP 18.441/2026 atualizou vencimentos-base a partir de 01/04/2026, mas o total 2026 deve ser conferido em tabela oficial posterior.', 'Benefícios não somados; adicional de insalubridade e contribuição CBPM/Cruz Azul variam conforme classificação, vínculo e regra vigente.', 'pmesp'),
    linhaRemuneracaoOficial('1º SGT — 1º Sargento PM', 6377.26, 0, 'Salário inicial oficial: salário-base + RETP. Mês de referência: julho/2025; Lei SP 18.441/2026 atualizou vencimentos-base a partir de 01/04/2026, mas o total 2026 deve ser conferido em tabela oficial posterior.', 'Benefícios não somados; adicional de insalubridade e contribuição CBPM/Cruz Azul variam conforme classificação, vínculo e regra vigente.', 'pmesp'),
    linhaRemuneracaoOficial('2º SGT — 2º Sargento PM', 5743.24, 0, 'Salário inicial oficial: salário-base + RETP. Mês de referência: julho/2025; Lei SP 18.441/2026 atualizou vencimentos-base a partir de 01/04/2026, mas o total 2026 deve ser conferido em tabela oficial posterior.', 'Benefícios não somados; adicional de insalubridade e contribuição CBPM/Cruz Azul variam conforme classificação, vínculo e regra vigente.', 'pmesp'),
    linhaRemuneracaoOficial('3º SGT — 3º Sargento PM', 5040.34, 0, 'Salário inicial oficial: salário-base + RETP. Mês de referência: julho/2025; Lei SP 18.441/2026 atualizou vencimentos-base a partir de 01/04/2026, mas o total 2026 deve ser conferido em tabela oficial posterior.', 'Benefícios não somados; adicional de insalubridade e contribuição CBPM/Cruz Azul variam conforme classificação, vínculo e regra vigente.', 'pmesp'),
    linhaRemuneracaoOficial('CABO PM', 4884.18, 0, 'Salário inicial oficial: salário-base + RETP. Mês de referência: julho/2025; Lei SP 18.441/2026 atualizou vencimentos-base a partir de 01/04/2026, mas o total 2026 deve ser conferido em tabela oficial posterior.', 'Benefícios não somados; adicional de insalubridade e contribuição CBPM/Cruz Azul variam conforme classificação, vínculo e regra vigente.', 'pmesp'),
    linhaRemuneracaoOficial('SD 1ª CL — Soldado PM 1ª Classe', 4520.20, 0, 'Salário inicial oficial: salário-base + RETP. Mês de referência: julho/2025; Lei SP 18.441/2026 atualizou vencimentos-base a partir de 01/04/2026, mas o total 2026 deve ser conferido em tabela oficial posterior.', 'Benefícios não somados; adicional de insalubridade e contribuição CBPM/Cruz Azul variam conforme classificação, vínculo e regra vigente.', 'pmesp'),
    linhaRemuneracaoOficial('SD 2ª CL — Soldado PM 2ª Classe', 4269.86, 0, 'Salário inicial oficial: salário-base + RETP. Mês de referência: julho/2025; Lei SP 18.441/2026 atualizou vencimentos-base a partir de 01/04/2026, mas o total 2026 deve ser conferido em tabela oficial posterior.', 'Benefícios não somados; adicional de insalubridade e contribuição CBPM/Cruz Azul variam conforme classificação, vínculo e regra vigente.', 'pmesp'),
    linhaRemuneracaoOficial('AL OF 4º CFO', 5013.58, 0, 'Salário inicial oficial: salário-base + RETP. Mês de referência: julho/2025; Lei SP 18.441/2026 atualizou vencimentos-base a partir de 01/04/2026, mas o total 2026 deve ser conferido em tabela oficial posterior.', 'Benefícios não somados; adicional de insalubridade e contribuição CBPM/Cruz Azul variam conforme classificação, vínculo e regra vigente.', 'pmesp'),
    linhaRemuneracaoOficial('AL OF 3º CFO', 4840.38, 0, 'Salário inicial oficial: salário-base + RETP. Mês de referência: julho/2025; Lei SP 18.441/2026 atualizou vencimentos-base a partir de 01/04/2026, mas o total 2026 deve ser conferido em tabela oficial posterior.', 'Benefícios não somados; adicional de insalubridade e contribuição CBPM/Cruz Azul variam conforme classificação, vínculo e regra vigente.', 'pmesp'),
    linhaRemuneracaoOficial('AL OF 2º CFO', 4458.80, 0, 'Salário inicial oficial: salário-base + RETP. Mês de referência: julho/2025; Lei SP 18.441/2026 atualizou vencimentos-base a partir de 01/04/2026, mas o total 2026 deve ser conferido em tabela oficial posterior.', 'Benefícios não somados; adicional de insalubridade e contribuição CBPM/Cruz Azul variam conforme classificação, vínculo e regra vigente.', 'pmesp'),
    linhaRemuneracaoOficial('AL OF 1º CFO', 4249.98, 0, 'Salário inicial oficial: salário-base + RETP. Mês de referência: julho/2025; Lei SP 18.441/2026 atualizou vencimentos-base a partir de 01/04/2026, mas o total 2026 deve ser conferido em tabela oficial posterior.', 'Benefícios não somados; adicional de insalubridade e contribuição CBPM/Cruz Azul variam conforme classificação, vínculo e regra vigente.', 'pmesp')
  ],
  pcsp: [
    linhaRemuneracaoOficial('Delegado Geral de Polícia', 24832.04, 0, 'Salário inicial oficial: salário-base + RETP + gratificação de representação + ADPJ. Mês de referência: julho/2025; Lei SP 18.441/2026 atualizou vencimentos-base a partir de 01/04/2026, mas o total 2026 deve ser conferido em tabela oficial posterior.', 'Benefícios não somados; adicional de insalubridade é variável conforme classificação oficial; demais rubricas dependem do vínculo, cargo e holerite.', 'pcsp'),
    linhaRemuneracaoOficial('Delegado de Polícia — Classe Especial', 18998.25, 0, 'Salário inicial oficial: salário-base + RETP + ADPJ. Mês de referência: julho/2025; Lei SP 18.441/2026 atualizou vencimentos-base a partir de 01/04/2026, mas o total 2026 deve ser conferido em tabela oficial posterior.', 'Benefícios não somados; adicional de insalubridade é variável conforme classificação oficial; demais rubricas dependem do vínculo, cargo e holerite.', 'pcsp'),
    linhaRemuneracaoOficial('Delegado de Polícia — 1ª Classe', 17935.65, 0, 'Salário inicial oficial: salário-base + RETP + ADPJ. Mês de referência: julho/2025; Lei SP 18.441/2026 atualizou vencimentos-base a partir de 01/04/2026, mas o total 2026 deve ser conferido em tabela oficial posterior.', 'Benefícios não somados; adicional de insalubridade é variável conforme classificação oficial; demais rubricas dependem do vínculo, cargo e holerite.', 'pcsp'),
    linhaRemuneracaoOficial('Delegado de Polícia — 2ª Classe', 16824.27, 0, 'Salário inicial oficial: salário-base + RETP + ADPJ. Mês de referência: julho/2025; Lei SP 18.441/2026 atualizou vencimentos-base a partir de 01/04/2026, mas o total 2026 deve ser conferido em tabela oficial posterior.', 'Benefícios não somados; adicional de insalubridade é variável conforme classificação oficial; demais rubricas dependem do vínculo, cargo e holerite.', 'pcsp'),
    linhaRemuneracaoOficial('Delegado de Polícia — 3ª Classe', 15789.88, 0, 'Salário inicial oficial: salário-base + RETP + ADPJ. Mês de referência: julho/2025; Lei SP 18.441/2026 atualizou vencimentos-base a partir de 01/04/2026, mas o total 2026 deve ser conferido em tabela oficial posterior.', 'Benefícios não somados; adicional de insalubridade é variável conforme classificação oficial; demais rubricas dependem do vínculo, cargo e holerite.', 'pcsp'),
    ...['Médico Legista', 'Perito Criminal'].flatMap(nome => [
      linhaRemuneracaoOficial(`${nome} — Classe Especial`, 16357.24, 0, 'Salário inicial oficial: salário-base + RETP. Mês de referência: julho/2025; Lei SP 18.441/2026 atualizou vencimentos-base a partir de 01/04/2026, mas o total 2026 deve ser conferido em tabela oficial posterior.', 'Benefícios não somados; adicional de insalubridade é variável conforme classificação oficial; demais rubricas dependem do vínculo, cargo e holerite.', 'pcsp'),
      linhaRemuneracaoOficial(`${nome} — 1ª Classe`, 15445.98, 0, 'Salário inicial oficial: salário-base + RETP. Mês de referência: julho/2025; Lei SP 18.441/2026 atualizou vencimentos-base a partir de 01/04/2026, mas o total 2026 deve ser conferido em tabela oficial posterior.', 'Benefícios não somados; adicional de insalubridade é variável conforme classificação oficial; demais rubricas dependem do vínculo, cargo e holerite.', 'pcsp'),
      linhaRemuneracaoOficial(`${nome} — 2ª Classe`, 14491.16, 0, 'Salário inicial oficial: salário-base + RETP. Mês de referência: julho/2025; Lei SP 18.441/2026 atualizou vencimentos-base a partir de 01/04/2026, mas o total 2026 deve ser conferido em tabela oficial posterior.', 'Benefícios não somados; adicional de insalubridade é variável conforme classificação oficial; demais rubricas dependem do vínculo, cargo e holerite.', 'pcsp'),
      linhaRemuneracaoOficial(`${nome} — 3ª Classe`, 13602.12, 0, 'Salário inicial oficial: salário-base + RETP. Mês de referência: julho/2025; Lei SP 18.441/2026 atualizou vencimentos-base a partir de 01/04/2026, mas o total 2026 deve ser conferido em tabela oficial posterior.', 'Benefícios não somados; adicional de insalubridade é variável conforme classificação oficial; demais rubricas dependem do vínculo, cargo e holerite.', 'pcsp')
    ]),
    ...['Escrivão de Polícia', 'Investigador de Polícia'].flatMap(nome => [
      linhaRemuneracaoOficial(`${nome} — Classe Especial`, 7804.58, 0, 'Salário inicial oficial: salário-base + RETP. Mês de referência: julho/2025; Lei SP 18.441/2026 atualizou vencimentos-base a partir de 01/04/2026, mas o total 2026 deve ser conferido em tabela oficial posterior.', 'Benefícios não somados; adicional de insalubridade é variável conforme classificação oficial; demais rubricas dependem do vínculo, cargo e holerite.', 'pcsp'),
      linhaRemuneracaoOficial(`${nome} — 1ª Classe`, 7086.34, 0, 'Salário inicial oficial: salário-base + RETP. Mês de referência: julho/2025; Lei SP 18.441/2026 atualizou vencimentos-base a partir de 01/04/2026, mas o total 2026 deve ser conferido em tabela oficial posterior.', 'Benefícios não somados; adicional de insalubridade é variável conforme classificação oficial; demais rubricas dependem do vínculo, cargo e holerite.', 'pcsp'),
      linhaRemuneracaoOficial(`${nome} — 2ª Classe`, 6613.20, 0, 'Salário inicial oficial: salário-base + RETP. Mês de referência: julho/2025; Lei SP 18.441/2026 atualizou vencimentos-base a partir de 01/04/2026, mas o total 2026 deve ser conferido em tabela oficial posterior.', 'Benefícios não somados; adicional de insalubridade é variável conforme classificação oficial; demais rubricas dependem do vínculo, cargo e holerite.', 'pcsp'),
      linhaRemuneracaoOficial(`${nome} — 3ª Classe`, 6173.66, 0, 'Salário inicial oficial: salário-base + RETP. Mês de referência: julho/2025; Lei SP 18.441/2026 atualizou vencimentos-base a partir de 01/04/2026, mas o total 2026 deve ser conferido em tabela oficial posterior.', 'Benefícios não somados; adicional de insalubridade é variável conforme classificação oficial; demais rubricas dependem do vínculo, cargo e holerite.', 'pcsp')
    ]),
    ...['Fotógrafo Técnico-Pericial', 'Agente de Telecomunicações Policial', 'Auxiliar de Necropsia', 'Desenhista Técnico-Pericial', 'Papiloscopista Policial'].flatMap(nome => [
      linhaRemuneracaoOficial(`${nome} — Classe Especial`, 6852.94, 0, 'Salário inicial oficial: salário-base + RETP. Mês de referência: julho/2025; Lei SP 18.441/2026 atualizou vencimentos-base a partir de 01/04/2026, mas o total 2026 deve ser conferido em tabela oficial posterior.', 'Benefícios não somados; adicional de insalubridade é variável conforme classificação oficial; demais rubricas dependem do vínculo, cargo e holerite.', 'pcsp'),
      linhaRemuneracaoOficial(`${nome} — 1ª Classe`, 6505.76, 0, 'Salário inicial oficial: salário-base + RETP. Mês de referência: julho/2025; Lei SP 18.441/2026 atualizou vencimentos-base a partir de 01/04/2026, mas o total 2026 deve ser conferido em tabela oficial posterior.', 'Benefícios não somados; adicional de insalubridade é variável conforme classificação oficial; demais rubricas dependem do vínculo, cargo e holerite.', 'pcsp'),
      linhaRemuneracaoOficial(`${nome} — 2ª Classe`, 6141.88, 0, 'Salário inicial oficial: salário-base + RETP. Mês de referência: julho/2025; Lei SP 18.441/2026 atualizou vencimentos-base a partir de 01/04/2026, mas o total 2026 deve ser conferido em tabela oficial posterior.', 'Benefícios não somados; adicional de insalubridade é variável conforme classificação oficial; demais rubricas dependem do vínculo, cargo e holerite.', 'pcsp'),
      linhaRemuneracaoOficial(`${nome} — 3ª Classe`, 5803.06, 0, 'Salário inicial oficial: salário-base + RETP. Mês de referência: julho/2025; Lei SP 18.441/2026 atualizou vencimentos-base a partir de 01/04/2026, mas o total 2026 deve ser conferido em tabela oficial posterior.', 'Benefícios não somados; adicional de insalubridade é variável conforme classificação oficial; demais rubricas dependem do vínculo, cargo e holerite.', 'pcsp')
    ]),
    ...['Agente Policial'].flatMap(nome => [
      linhaRemuneracaoOficial(`${nome} — Classe Especial`, 5685.64, 0, 'Salário inicial oficial: salário-base + RETP. Mês de referência: julho/2025; Lei SP 18.441/2026 atualizou vencimentos-base a partir de 01/04/2026, mas o total 2026 deve ser conferido em tabela oficial posterior.', 'Benefícios não somados; adicional de insalubridade é variável conforme classificação oficial; demais rubricas dependem do vínculo, cargo e holerite.', 'pcsp'),
      linhaRemuneracaoOficial(`${nome} — 1ª Classe`, 5371.36, 0, 'Salário inicial oficial: salário-base + RETP. Mês de referência: julho/2025; Lei SP 18.441/2026 atualizou vencimentos-base a partir de 01/04/2026, mas o total 2026 deve ser conferido em tabela oficial posterior.', 'Benefícios não somados; adicional de insalubridade é variável conforme classificação oficial; demais rubricas dependem do vínculo, cargo e holerite.', 'pcsp'),
      linhaRemuneracaoOficial(`${nome} — 2ª Classe`, 5037.22, 0, 'Salário inicial oficial: salário-base + RETP. Mês de referência: julho/2025; Lei SP 18.441/2026 atualizou vencimentos-base a partir de 01/04/2026, mas o total 2026 deve ser conferido em tabela oficial posterior.', 'Benefícios não somados; adicional de insalubridade é variável conforme classificação oficial; demais rubricas dependem do vínculo, cargo e holerite.', 'pcsp'),
      linhaRemuneracaoOficial(`${nome} — 3ª Classe`, 4725.36, 0, 'Salário inicial oficial: salário-base + RETP. Mês de referência: julho/2025; Lei SP 18.441/2026 atualizou vencimentos-base a partir de 01/04/2026, mas o total 2026 deve ser conferido em tabela oficial posterior.', 'Benefícios não somados; adicional de insalubridade é variável conforme classificação oficial; demais rubricas dependem do vínculo, cargo e holerite.', 'pcsp')
    ]),
    ...['Atendente Necrotério Policial', 'Auxiliar Papiloscopista Policial'].flatMap(nome => [
      linhaRemuneracaoOficial(`${nome} — Classe Especial`, 5685.64, 0, 'Salário inicial oficial: salário-base + RETP. Mês de referência: julho/2025; Lei SP 18.441/2026 atualizou vencimentos-base a partir de 01/04/2026, mas o total 2026 deve ser conferido em tabela oficial posterior.', 'Benefícios não somados; adicional de insalubridade é variável conforme classificação oficial; demais rubricas dependem do vínculo, cargo e holerite.', 'pcsp'),
      linhaRemuneracaoOficial(`${nome} — 1ª Classe`, 5371.36, 0, 'Salário inicial oficial: salário-base + RETP. Mês de referência: julho/2025; Lei SP 18.441/2026 atualizou vencimentos-base a partir de 01/04/2026, mas o total 2026 deve ser conferido em tabela oficial posterior.', 'Benefícios não somados; adicional de insalubridade é variável conforme classificação oficial; demais rubricas dependem do vínculo, cargo e holerite.', 'pcsp'),
      linhaRemuneracaoOficial(`${nome} — 2ª Classe`, 5037.22, 0, 'Salário inicial oficial: salário-base + RETP. Mês de referência: julho/2025; Lei SP 18.441/2026 atualizou vencimentos-base a partir de 01/04/2026, mas o total 2026 deve ser conferido em tabela oficial posterior.', 'Benefícios não somados; adicional de insalubridade é variável conforme classificação oficial; demais rubricas dependem do vínculo, cargo e holerite.', 'pcsp'),
      linhaRemuneracaoOficial(`${nome} — 3ª Classe`, 4725.36, 0, 'Salário inicial oficial: salário-base + RETP. Mês de referência: julho/2025; Lei SP 18.441/2026 atualizou vencimentos-base a partir de 01/04/2026, mas o total 2026 deve ser conferido em tabela oficial posterior.', 'Benefícios não somados; adicional de insalubridade é variável conforme classificação oficial; demais rubricas dependem do vínculo, cargo e holerite.', 'pcsp')
    ])
  ]
};


REMUNERACAO_SP_OFICIAL.pf = CARGOS_PF.map(cargo => linhaRemuneracaoOficial(
  cargo.text.replace(/^PF — /, ''),
  cargo.padrao,
  0,
  cargo.criterio,
  cargo.benefDesc,
  'pf',
  cargo.badge || 'Federal 2026'
));


REMUNERACAO_SP_OFICIAL.prf = CARGOS_PRF.map(cargo => linhaRemuneracaoOficial(
  cargo.text.replace(/^PRF — /, ''),
  cargo.padrao,
  0,
  cargo.criterio,
  cargo.benefDesc,
  'prf',
  cargo.badge || 'Federal 2026'
));

REMUNERACAO_SP_OFICIAL.bmsp = REMUNERACAO_SP_OFICIAL.pmesp.map(linha => Object.assign({}, linha, {
  cargo: String(linha.cargo || '')
    .replace('CMT G — Comandante Geral PM', 'CCB — Comandante do Corpo de Bombeiros da PMESP')
    .replace(/PM/g, 'BM'),
  fonteKey: 'bmsp',
  criterio: 'Salário inicial oficial por posto/graduação: tabela SGGD/SP da área policial, referência julho/2025. Aplicável ao CBPMESP/BMSP enquanto órgão da PMESP. A Lei SP 18.441/2026 atualizou vencimentos-base desde 01/04/2026; total 2026 deve ser confirmado em tabela oficial posterior ou holerite.',
  benefDesc: 'Benefícios não somados; RETP, DEJEM, insalubridade, CBPM/Cruz Azul, diárias, ajuda de custo, transporte e rubricas pessoais dependem de posto/graduação, escala, laudo, vínculo e situação funcional.'
}));



REMUNERACAO_SP_OFICIAL.bmsc = [
  linhaRemuneracaoOficial('CEL BM — Coronel CBMSC (estimado)', 39623.58, 0, 'Subsídio bruto mensal por posto/graduação; estimativa técnica por equivalência com a tabela dos militares estaduais de SC e legislação remuneratória vigente. Confirmar em tabela consolidada oficial ou contracheque.', `Auxílio-alimentação SC de referência: ${fmt(AUX_ALIM_SC_PADRAO)}; não somado ao bruto. Diárias, indenizações, adicional de serviço, escala e parcelas pessoais dependem de ato e contracheque.`, 'bmsc', 'Abr/2026 estimado'),
  linhaRemuneracaoOficial('TEN CEL BM — Tenente-Coronel CBMSC (estimado)', 35661.46, 0, 'Subsídio bruto mensal por posto/graduação; estimativa técnica por equivalência com a tabela dos militares estaduais de SC e legislação remuneratória vigente. Confirmar em tabela consolidada oficial ou contracheque.', `Auxílio-alimentação SC de referência: ${fmt(AUX_ALIM_SC_PADRAO)}; não somado ao bruto.`, 'bmsc', 'Abr/2026 estimado'),
  linhaRemuneracaoOficial('MAJ BM — Major CBMSC (estimado)', 31699.35, 0, 'Subsídio bruto mensal por posto/graduação; estimativa técnica por equivalência com a tabela dos militares estaduais de SC e legislação remuneratória vigente. Confirmar em tabela consolidada oficial ou contracheque.', `Auxílio-alimentação SC de referência: ${fmt(AUX_ALIM_SC_PADRAO)}; não somado ao bruto.`, 'bmsc', 'Abr/2026 estimado'),
  linhaRemuneracaoOficial('CAP BM — Capitão CBMSC (estimado)', 27737.23, 0, 'Subsídio bruto mensal por posto/graduação; estimativa técnica por equivalência com a tabela dos militares estaduais de SC e legislação remuneratória vigente. Confirmar em tabela consolidada oficial ou contracheque.', `Auxílio-alimentação SC de referência: ${fmt(AUX_ALIM_SC_PADRAO)}; não somado ao bruto.`, 'bmsc', 'Abr/2026 estimado'),
  linhaRemuneracaoOficial('1º TEN BM — 1º Tenente CBMSC (estimado)', 25359.48, 0, 'Subsídio bruto mensal por posto/graduação; estimativa técnica por equivalência com a tabela dos militares estaduais de SC e legislação remuneratória vigente. Confirmar em tabela consolidada oficial ou contracheque.', `Auxílio-alimentação SC de referência: ${fmt(AUX_ALIM_SC_PADRAO)}; não somado ao bruto.`, 'bmsc', 'Abr/2026 estimado'),
  linhaRemuneracaoOficial('2º TEN BM — 2º Tenente CBMSC — edital CFO 2026', 21284.40, 0, 'Valor oficial divulgado pelo CBMSC para 2º Tenente após conclusão do CFO 2026; referência do concurso, sem somar auxílio-alimentação ao bruto.', `Auxílio-alimentação informado no edital: ${fmt(AUX_ALIM_SC_PADRAO)}; não somado ao bruto.`, 'bmsc', 'Edital 2026'),
  linhaRemuneracaoOficial('2º TEN BM — 2º Tenente CBMSC — abr/2026 (estimado)', 22774.31, 0, 'Estimativa técnica com aplicação da etapa de 7% de 01/04/2026 da LC SC 872/2025 sobre o valor oficial de R$ 21.284,40 do edital CFO 2026; confirmar em folha/tabela oficial posterior.', `Auxílio-alimentação SC de referência: ${fmt(AUX_ALIM_SC_PADRAO)}; não somado ao bruto.`, 'bmsc', 'Abr/2026 estimado'),
  linhaRemuneracaoOficial('ASP OF BM / CAD BM — Aspirante/Cadete CBMSC — edital CFO 2026', 18670.37, 0, 'Valor oficial divulgado pelo CBMSC para Cadete no CFO 2026; usar como referência de ingresso/curso, sem somar auxílio-alimentação ao bruto.', `Auxílio-alimentação informado no edital: ${fmt(AUX_ALIM_SC_PADRAO)}; não somado ao bruto.`, 'bmsc', 'Edital 2026'),
  linhaRemuneracaoOficial('ASP OF BM — Aspirante Oficial CBMSC — abr/2026 (estimado)', 19977.30, 0, 'Estimativa técnica com aplicação da etapa de 7% de 01/04/2026 da LC SC 872/2025 sobre o valor oficial de R$ 18.670,37 do edital CFO 2026; confirmar em folha/tabela oficial posterior.', `Auxílio-alimentação SC de referência: ${fmt(AUX_ALIM_SC_PADRAO)}; não somado ao bruto.`, 'bmsc', 'Abr/2026 estimado'),
  linhaRemuneracaoOficial('SUBTEN BM — Subtenente CBMSC (estimado)', 19440.00, 0, 'Subsídio bruto mensal estimado por posto/graduação; confirmar em tabela oficial consolidada ou contracheque.', `Auxílio-alimentação SC de referência: ${fmt(AUX_ALIM_SC_PADRAO)}; não somado ao bruto.`, 'bmsc', 'Abr/2026 estimado'),
  linhaRemuneracaoOficial('1º SGT BM — 1º Sargento CBMSC (estimado)', 15181.42, 0, 'Subsídio bruto mensal estimado por posto/graduação; confirmar em tabela oficial consolidada ou contracheque.', `Auxílio-alimentação SC de referência: ${fmt(AUX_ALIM_SC_PADRAO)}; não somado ao bruto.`, 'bmsc', 'Abr/2026 estimado'),
  linhaRemuneracaoOficial('2º SGT BM — 2º Sargento CBMSC (estimado)', 12904.51, 0, 'Subsídio bruto mensal estimado por posto/graduação; confirmar em tabela oficial consolidada ou contracheque.', `Auxílio-alimentação SC de referência: ${fmt(AUX_ALIM_SC_PADRAO)}; não somado ao bruto.`, 'bmsc', 'Abr/2026 estimado'),
  linhaRemuneracaoOficial('3º SGT BM — 3º Sargento CBMSC (estimado)', 10969.02, 0, 'Subsídio bruto mensal estimado por posto/graduação; confirmar em tabela oficial consolidada ou contracheque.', `Auxílio-alimentação SC de referência: ${fmt(AUX_ALIM_SC_PADRAO)}; não somado ao bruto.`, 'bmsc', 'Abr/2026 estimado'),
  linhaRemuneracaoOficial('CABO BM — Cabo CBMSC (estimado)', 9720.00, 0, 'Subsídio bruto mensal estimado por posto/graduação; confirmar em tabela oficial consolidada ou contracheque.', `Auxílio-alimentação SC de referência: ${fmt(AUX_ALIM_SC_PADRAO)}; não somado ao bruto.`, 'bmsc', 'Abr/2026 estimado'),
  linhaRemuneracaoOficial('AL SD BM / SD BM — Aluno-Soldado/Soldado CBMSC — edital CFP 2026', 8015.00, 0, 'Valor oficial do edital CFP 001/2026/DP/CBMSC para Aluno-Soldado/Soldado, referência dezembro/2025, sem somar auxílio-alimentação ao bruto.', `Auxílio-alimentação informado no edital: ${fmt(AUX_ALIM_SC_PADRAO)}; não somado ao bruto.`, 'bmsc', 'Edital 2026'),
  linhaRemuneracaoOficial('SD BM — Soldado CBMSC — abr/2026 (estimado)', 8576.05, 0, 'Estimativa técnica com aplicação da etapa de 7% de 01/04/2026 da LC SC 872/2025 sobre o valor oficial de R$ 8.015,00 do edital CFP 2026; confirmar em folha/tabela oficial posterior.', `Auxílio-alimentação SC de referência: ${fmt(AUX_ALIM_SC_PADRAO)}; não somado ao bruto.`, 'bmsc', 'Abr/2026 estimado')
];


REMUNERACAO_SP_OFICIAL.bmes = [
  linhaRemuneracaoOficial('CEL BM — Coronel CBMES — Ref. 1 — dez/2025', 25197.24, 0, 'Subsídio bruto mensal oficial da tabela PM/CBM ES a partir de 01/12/2025, referência inicial.', `Auxílio-alimentação ES de referência: ${fmt(AUX_ALIM_ES_PADRAO)}; não somado. Rubricas pessoais e indenizatórias dependem do contracheque.`, 'bmes', 'Dez/2025'),
  linhaRemuneracaoOficial('CEL BM — Coronel CBMES — Ref. 15 — dez/2025', 33247.22, 0, 'Subsídio bruto mensal oficial da tabela PM/CBM ES a partir de 01/12/2025, referência final.', `Auxílio-alimentação ES de referência: ${fmt(AUX_ALIM_ES_PADRAO)}; não somado.`, 'bmes', 'Dez/2025'),
  linhaRemuneracaoOficial('CEL BM — Coronel CBMES — Ref. 15 — dez/2026', 36132.91, 0, 'Linha de topo para oficial superior conforme Lei ES 12.783/2026; usar somente para referência final indicada na lei.', `Auxílio-alimentação ES de referência: ${fmt(AUX_ALIM_ES_PADRAO)}; não somado.`, 'bmes', 'Lei ES 12.783/2026'),
  linhaRemuneracaoOficial('TEN CEL BM — Tenente-Coronel CBMES — Ref. 1 — dez/2025', 22906.55, 0, 'Subsídio bruto mensal oficial da tabela PM/CBM ES a partir de 01/12/2025, referência inicial.', `Auxílio-alimentação ES de referência: ${fmt(AUX_ALIM_ES_PADRAO)}; não somado.`, 'bmes', 'Dez/2025'),
  linhaRemuneracaoOficial('TEN CEL BM — Tenente-Coronel CBMES — Ref. 15 — dez/2025', 30224.76, 0, 'Subsídio bruto mensal oficial da tabela PM/CBM ES a partir de 01/12/2025, referência final.', `Auxílio-alimentação ES de referência: ${fmt(AUX_ALIM_ES_PADRAO)}; não somado.`, 'bmes', 'Dez/2025'),
  linhaRemuneracaoOficial('TEN CEL BM — Tenente-Coronel CBMES — Ref. 15 — dez/2026', 32282.28, 0, 'Linha de topo para oficial superior conforme Lei ES 12.783/2026; usar somente para referência final indicada na lei.', `Auxílio-alimentação ES de referência: ${fmt(AUX_ALIM_ES_PADRAO)}; não somado.`, 'bmes', 'Lei ES 12.783/2026'),
  linhaRemuneracaoOficial('MAJ BM — Major CBMES — Ref. 1 — dez/2025', 19088.81, 0, 'Subsídio bruto mensal oficial da tabela PM/CBM ES a partir de 01/12/2025, referência inicial.', `Auxílio-alimentação ES de referência: ${fmt(AUX_ALIM_ES_PADRAO)}; não somado.`, 'bmes', 'Dez/2025'),
  linhaRemuneracaoOficial('MAJ BM — Major CBMES — Ref. 15 — dez/2025', 25187.30, 0, 'Subsídio bruto mensal oficial da tabela PM/CBM ES a partir de 01/12/2025, referência final.', `Auxílio-alimentação ES de referência: ${fmt(AUX_ALIM_ES_PADRAO)}; não somado.`, 'bmes', 'Dez/2025'),
  linhaRemuneracaoOficial('MAJ BM — Major CBMES — Ref. 15 — dez/2026', 27137.77, 0, 'Linha de topo para oficial superior conforme Lei ES 12.783/2026; usar somente para referência final indicada na lei.', `Auxílio-alimentação ES de referência: ${fmt(AUX_ALIM_ES_PADRAO)}; não somado.`, 'bmes', 'Lei ES 12.783/2026'),
  linhaRemuneracaoOficial('CAP BM — Capitão CBMES — Ref. 1 — dez/2025', 15519.36, 0, 'Subsídio bruto mensal oficial da tabela PM/CBM ES a partir de 01/12/2025.', `Auxílio-alimentação ES de referência: ${fmt(AUX_ALIM_ES_PADRAO)}; não somado.`, 'bmes', 'Dez/2025'),
  linhaRemuneracaoOficial('CAP BM — Capitão CBMES — Ref. 15 — dez/2025', 20477.47, 0, 'Subsídio bruto mensal oficial da tabela PM/CBM ES a partir de 01/12/2025.', `Auxílio-alimentação ES de referência: ${fmt(AUX_ALIM_ES_PADRAO)}; não somado.`, 'bmes', 'Dez/2025'),
  linhaRemuneracaoOficial('1º TEN BM — 1º Tenente CBMES — Ref. 1 — dez/2025', 13364.21, 0, 'Subsídio bruto mensal oficial da tabela PM/CBM ES a partir de 01/12/2025.', `Auxílio-alimentação ES de referência: ${fmt(AUX_ALIM_ES_PADRAO)}; não somado.`, 'bmes', 'Dez/2025'),
  linhaRemuneracaoOficial('1º TEN BM — 1º Tenente CBMES — Ref. 15 — dez/2025', 17633.78, 0, 'Subsídio bruto mensal oficial da tabela PM/CBM ES a partir de 01/12/2025.', `Auxílio-alimentação ES de referência: ${fmt(AUX_ALIM_ES_PADRAO)}; não somado.`, 'bmes', 'Dez/2025'),
  linhaRemuneracaoOficial('2º TEN BM — 2º Tenente CBMES — Ref. 1 — dez/2025', 12452.99, 0, 'Subsídio bruto mensal oficial da tabela PM/CBM ES a partir de 01/12/2025.', `Auxílio-alimentação ES de referência: ${fmt(AUX_ALIM_ES_PADRAO)}; não somado.`, 'bmes', 'Dez/2025'),
  linhaRemuneracaoOficial('2º TEN BM — 2º Tenente CBMES — Ref. 15 — dez/2025', 16431.48, 0, 'Subsídio bruto mensal oficial da tabela PM/CBM ES a partir de 01/12/2025.', `Auxílio-alimentação ES de referência: ${fmt(AUX_ALIM_ES_PADRAO)}; não somado.`, 'bmes', 'Dez/2025'),
  linhaRemuneracaoOficial('AL OF BM — Aluno-Oficial CBMES — 1º ano CFO 2026', 4113.27, 0, 'Valor bruto oficial do Anexo II do Edital de Abertura nº 001/2026/CFO CBMES, desconsiderando auxílio-alimentação.', `Auxílio-alimentação não somado; GSE não aplicada à linha de Aluno-Oficial conforme observação do edital.`, 'bmes', 'Edital CFO 2026'),
  linhaRemuneracaoOficial('AL OF BM — Aluno-Oficial CBMES — 2º ano CFO 2026', 5027.34, 0, 'Valor bruto oficial do Anexo II do Edital de Abertura nº 001/2026/CFO CBMES, desconsiderando auxílio-alimentação.', `Auxílio-alimentação não somado; GSE não aplicada à linha de Aluno-Oficial conforme observação do edital.`, 'bmes', 'Edital CFO 2026'),
  linhaRemuneracaoOficial('AL OF BM — Aluno-Oficial CBMES — 3º ano CFO 2026', 5484.36, 0, 'Valor bruto oficial do Anexo II do Edital de Abertura nº 001/2026/CFO CBMES, desconsiderando auxílio-alimentação.', `Auxílio-alimentação não somado; GSE não aplicada à linha de Aluno-Oficial conforme observação do edital.`, 'bmes', 'Edital CFO 2026'),
  linhaRemuneracaoOficial('ASP OF BM — Aspirante a Oficial CBMES — pós-CFO 2026', 10221.74, 0, 'Valor bruto oficial do Anexo II do Edital de Abertura nº 001/2026/CFO CBMES, desconsiderando auxílio-alimentação e Gratificação de Serviço Extraordinário.', `Auxílio-alimentação e GSE não somados; conferir escala, lotação e contracheque.`, 'bmes', 'Edital CFO 2026'),
  linhaRemuneracaoOficial('SUBTEN BM — Subtenente CBMES — Ref. 1 — dez/2025', 10326.86, 0, 'Subsídio bruto mensal oficial da tabela PM/CBM ES a partir de 01/12/2025.', `Auxílio-alimentação ES de referência: ${fmt(AUX_ALIM_ES_PADRAO)}; não somado.`, 'bmes', 'Dez/2025'),
  linhaRemuneracaoOficial('SUBTEN BM — Subtenente CBMES — Ref. 15 — dez/2025', 13626.12, 0, 'Subsídio bruto mensal oficial da tabela PM/CBM ES a partir de 01/12/2025.', `Auxílio-alimentação ES de referência: ${fmt(AUX_ALIM_ES_PADRAO)}; não somado.`, 'bmes', 'Dez/2025'),
  linhaRemuneracaoOficial('1º SGT BM — 1º Sargento CBMES — Ref. 1 — dez/2025', 9719.42, 0, 'Subsídio bruto mensal oficial da tabela PM/CBM ES a partir de 01/12/2025.', `Auxílio-alimentação ES de referência: ${fmt(AUX_ALIM_ES_PADRAO)}; não somado.`, 'bmes', 'Dez/2025'),
  linhaRemuneracaoOficial('1º SGT BM — 1º Sargento CBMES — Ref. 15 — dez/2025', 12824.58, 0, 'Subsídio bruto mensal oficial da tabela PM/CBM ES a partir de 01/12/2025.', `Auxílio-alimentação ES de referência: ${fmt(AUX_ALIM_ES_PADRAO)}; não somado.`, 'bmes', 'Dez/2025'),
  linhaRemuneracaoOficial('2º SGT BM — 2º Sargento CBMES — Ref. 1 — dez/2025', 8808.23, 0, 'Subsídio bruto mensal oficial da tabela PM/CBM ES a partir de 01/12/2025.', `Auxílio-alimentação ES de referência: ${fmt(AUX_ALIM_ES_PADRAO)}; não somado.`, 'bmes', 'Dez/2025'),
  linhaRemuneracaoOficial('2º SGT BM — 2º Sargento CBMES — Ref. 15 — dez/2025', 11622.30, 0, 'Subsídio bruto mensal oficial da tabela PM/CBM ES a partir de 01/12/2025.', `Auxílio-alimentação ES de referência: ${fmt(AUX_ALIM_ES_PADRAO)}; não somado.`, 'bmes', 'Dez/2025'),
  linhaRemuneracaoOficial('3º SGT BM — 3º Sargento CBMES — Ref. 1 — dez/2025', 7897.06, 0, 'Subsídio bruto mensal oficial da tabela PM/CBM ES a partir de 01/12/2025.', `Auxílio-alimentação ES de referência: ${fmt(AUX_ALIM_ES_PADRAO)}; não somado.`, 'bmes', 'Dez/2025'),
  linhaRemuneracaoOficial('3º SGT BM — 3º Sargento CBMES — Ref. 15 — dez/2025', 10419.99, 0, 'Subsídio bruto mensal oficial da tabela PM/CBM ES a partir de 01/12/2025.', `Auxílio-alimentação ES de referência: ${fmt(AUX_ALIM_ES_PADRAO)}; não somado.`, 'bmes', 'Dez/2025'),
  linhaRemuneracaoOficial('CABO BM — Cabo CBMES — Ref. 1 — dez/2025', 6378.37, 0, 'Subsídio bruto mensal oficial da tabela PM/CBM ES a partir de 01/12/2025.', `Auxílio-alimentação ES de referência: ${fmt(AUX_ALIM_ES_PADRAO)}; não somado.`, 'bmes', 'Dez/2025'),
  linhaRemuneracaoOficial('CABO BM — Cabo CBMES — Ref. 15 — dez/2025', 8416.16, 0, 'Subsídio bruto mensal oficial da tabela PM/CBM ES a partir de 01/12/2025.', `Auxílio-alimentação ES de referência: ${fmt(AUX_ALIM_ES_PADRAO)}; não somado.`, 'bmes', 'Dez/2025'),
  linhaRemuneracaoOficial('SD BM — Soldado CBMES — Ref. 1 — dez/2025', 5741.46, 0, 'Subsídio bruto mensal oficial da tabela PM/CBM ES a partir de 01/12/2025.', `Auxílio-alimentação ES de referência: ${fmt(AUX_ALIM_ES_PADRAO)}; não somado.`, 'bmes', 'Dez/2025'),
  linhaRemuneracaoOficial('SD BM — Soldado CBMES — Ref. 15 — dez/2025', 7575.15, 0, 'Subsídio bruto mensal oficial da tabela PM/CBM ES a partir de 01/12/2025.', `Auxílio-alimentação ES de referência: ${fmt(AUX_ALIM_ES_PADRAO)}; não somado.`, 'bmes', 'Dez/2025')
];

REMUNERACAO_SP_OFICIAL.bmmt = CARGOS_BMMT.map(cargo => linhaRemuneracaoOficial(
  cargo.text,
  cargo.padrao,
  0,
  cargo.criterio || 'Subsídio bruto mensal de referência do CBMMT por posto/graduação e nível; conferir RGAs posteriores, ato de enquadramento, edital ou contracheque.',
  cargo.benefDesc || 'Benefícios e rubricas pessoais não somados; conferir etapa alimentação, fardamento, diárias, indenizações, escala, lotação, temporários/PTTC e contracheque.',
  'bmmt',
  cargo.badge || 'CBMMT/MT'
));

REMUNERACAO_SP_OFICIAL.bmrj = [
  linhaRemuneracaoOficial('CEL BM — Coronel CBMERJ', 24050.02, 0, 'Total bruto oficial: soldo R$ 3.270,72 + GRET 192,5% + GHP 160% + GRAM 62,5%. Referência: janeiro/2026.', 'Benefícios não somados: auxílio-transporte R$ 100,00/mês; triênio 10% a 60% quando preservado; PTTC, diárias, indenizações, SPSMERJ e rubricas pessoais dependem de ato/contracheque.', 'bmrj', 'SEDEC jan/2026'),
  linhaRemuneracaoOficial('TEN CEL BM — Tenente-Coronel CBMERJ', 21644.95, 0, 'Total bruto oficial: soldo R$ 2.943,64 + GRET 192,5% + GHP 160% + GRAM 62,5%. Referência: janeiro/2026.', 'Benefícios não somados: auxílio-transporte R$ 100,00/mês; triênio 10% a 60% quando preservado; PTTC, diárias, indenizações, SPSMERJ e rubricas pessoais dependem de ato/contracheque.', 'bmrj', 'SEDEC jan/2026'),
  linhaRemuneracaoOficial('MAJ BM — Major CBMERJ — GHP 110%', 17327.88, 0, 'Total bruto oficial: soldo R$ 2.649,27 + GRET 192,5% + GHP 110% + GRAM 62,5%. Referência: janeiro/2026.', 'Benefícios e rubricas pessoais não somados; conferir habilitação, posto, contracheque e ato de enquadramento.', 'bmrj', 'SEDEC jan/2026'),
  linhaRemuneracaoOficial('MAJ BM — Major CBMERJ — GHP 80%', 16036.36, 0, 'Total bruto oficial: soldo R$ 2.649,27 + GRET 192,5% + GHP 80% + GRAM 62,5%. Referência: janeiro/2026.', 'Benefícios e rubricas pessoais não somados; conferir habilitação, posto, contracheque e ato de enquadramento.', 'bmrj', 'SEDEC jan/2026'),
  linhaRemuneracaoOficial('CAP BM — Capitão CBMERJ — GHP 110%', 13948.46, 0, 'Total bruto oficial: soldo R$ 2.384,35 + GRET 150% + GHP 110% + GRAM 62,5%. Referência: janeiro/2026.', 'Benefícios e rubricas pessoais não somados; conferir habilitação, posto, contracheque e ato de enquadramento.', 'bmrj', 'SEDEC jan/2026'),
  linhaRemuneracaoOficial('CAP BM — Capitão CBMERJ — GHP 80%', 12786.09, 0, 'Total bruto oficial: soldo R$ 2.384,35 + GRET 150% + GHP 80% + GRAM 62,5%. Referência: janeiro/2026.', 'Benefícios e rubricas pessoais não somados; conferir habilitação, posto, contracheque e ato de enquadramento.', 'bmrj', 'SEDEC jan/2026'),
  linhaRemuneracaoOficial('1º TEN BM — 1º Tenente CBMERJ — GHP 110%', 12551.71, 0, 'Total bruto oficial: soldo R$ 2.145,59 + GRET 150% + GHP 110% + GRAM 62,5%. Referência: janeiro/2026.', 'Benefícios e rubricas pessoais não somados; conferir habilitação, posto, contracheque e ato de enquadramento.', 'bmrj', 'SEDEC jan/2026'),
  linhaRemuneracaoOficial('1º TEN BM — 1º Tenente CBMERJ — GHP 80%', 11505.73, 0, 'Total bruto oficial: soldo R$ 2.145,59 + GRET 150% + GHP 80% + GRAM 62,5%. Referência: janeiro/2026.', 'Benefícios e rubricas pessoais não somados; conferir habilitação, posto, contracheque e ato de enquadramento.', 'bmrj', 'SEDEC jan/2026'),
  linhaRemuneracaoOficial('2º TEN BM — 2º Tenente CBMERJ — GHP 110%', 11288.92, 0, 'Total bruto oficial: soldo R$ 1.929,73 + GRET 150% + GHP 110% + GRAM 62,5%. Referência: janeiro/2026.', 'Benefícios e rubricas pessoais não somados; conferir habilitação, posto, contracheque e ato de enquadramento.', 'bmrj', 'SEDEC jan/2026'),
  linhaRemuneracaoOficial('2º TEN BM — 2º Tenente CBMERJ — GHP 80%', 10348.18, 0, 'Total bruto oficial: soldo R$ 1.929,73 + GRET 150% + GHP 80% + GRAM 62,5%. Referência: janeiro/2026.', 'Benefícios e rubricas pessoais não somados; conferir habilitação, posto, contracheque e ato de enquadramento.', 'bmrj', 'SEDEC jan/2026'),
  linhaRemuneracaoOficial('ASP OF BM — Aspirante Oficial CBMERJ — GHP 110%', 10159.92, 0, 'Total bruto oficial: soldo R$ 1.736,74 + GRET 150% + GHP 110% + GRAM 62,5%. Referência: janeiro/2026.', 'Benefícios e rubricas pessoais não somados; conferir habilitação, posto, contracheque e ato de enquadramento.', 'bmrj', 'SEDEC jan/2026'),
  linhaRemuneracaoOficial('ASP OF BM — Aspirante Oficial CBMERJ — GHP 80%', 9313.27, 0, 'Total bruto oficial: soldo R$ 1.736,74 + GRET 150% + GHP 80% + GRAM 62,5%. Referência: janeiro/2026.', 'Benefícios e rubricas pessoais não somados; conferir habilitação, posto, contracheque e ato de enquadramento.', 'bmrj', 'SEDEC jan/2026'),
  linhaRemuneracaoOficial('SUBTEN BM — Subtenente CBMERJ — GHP 110%', 10159.92, 0, 'Total bruto oficial: soldo R$ 1.736,74 + GRET 150% + GHP 110% + GRAM 62,5%. Referência: janeiro/2026.', 'Benefícios e rubricas pessoais não somados; conferir habilitação, graduação, contracheque e ato de enquadramento.', 'bmrj', 'SEDEC jan/2026'),
  linhaRemuneracaoOficial('SUBTEN BM — Subtenente CBMERJ — GHP 80%', 9313.27, 0, 'Total bruto oficial: soldo R$ 1.736,74 + GRET 150% + GHP 80% + GRAM 62,5%. Referência: janeiro/2026.', 'Benefícios e rubricas pessoais não somados; conferir habilitação, graduação, contracheque e ato de enquadramento.', 'bmrj', 'SEDEC jan/2026'),
  linhaRemuneracaoOficial('1º SGT BM — 1º Sargento CBMERJ — GHP 110%', 9337.19, 0, 'Total bruto oficial: soldo R$ 1.596,10 + GRET 150% + GHP 110% + GRAM 62,5%. Referência: janeiro/2026.', 'Benefícios e rubricas pessoais não somados; conferir habilitação, graduação, contracheque e ato de enquadramento.', 'bmrj', 'SEDEC jan/2026'),
  linhaRemuneracaoOficial('1º SGT BM — 1º Sargento CBMERJ — GHP 80%', 8559.09, 0, 'Total bruto oficial: soldo R$ 1.596,10 + GRET 150% + GHP 80% + GRAM 62,5%. Referência: janeiro/2026.', 'Benefícios e rubricas pessoais não somados; conferir habilitação, graduação, contracheque e ato de enquadramento.', 'bmrj', 'SEDEC jan/2026'),
  linhaRemuneracaoOficial('2º SGT BM — 2º Sargento CBMERJ — GHP 110%', 8476.24, 0, 'Total bruto oficial: soldo R$ 1.448,93 + GRET 150% + GHP 110% + GRAM 62,5%. Referência: janeiro/2026.', 'Benefícios e rubricas pessoais não somados; conferir habilitação, graduação, contracheque e ato de enquadramento.', 'bmrj', 'SEDEC jan/2026'),
  linhaRemuneracaoOficial('2º SGT BM — 2º Sargento CBMERJ — GHP 80%', 7769.89, 0, 'Total bruto oficial: soldo R$ 1.448,93 + GRET 150% + GHP 80% + GRAM 62,5%. Referência: janeiro/2026.', 'Benefícios e rubricas pessoais não somados; conferir habilitação, graduação, contracheque e ato de enquadramento.', 'bmrj', 'SEDEC jan/2026'),
  linhaRemuneracaoOficial('3º SGT BM — 3º Sargento CBMERJ — GHP 110%', 7710.89, 0, 'Total bruto oficial: soldo R$ 1.318,10 + GRET 150% + GHP 110% + GRAM 62,5%. Referência: janeiro/2026.', 'Benefícios e rubricas pessoais não somados; conferir habilitação, graduação, contracheque e ato de enquadramento.', 'bmrj', 'SEDEC jan/2026'),
  linhaRemuneracaoOficial('3º SGT BM — 3º Sargento CBMERJ — GHP 80%', 7395.39, 0, 'Total bruto oficial: soldo R$ 1.318,10 + GRET 150% + GHP 80% + GRAM 62,5%. Referência: janeiro/2026.', 'Benefícios e rubricas pessoais não somados; conferir habilitação, graduação, contracheque e ato de enquadramento.', 'bmrj', 'SEDEC jan/2026'),
  linhaRemuneracaoOficial('CB BM — Cabo CBMERJ', 6028.44, 0, 'Total bruto oficial: soldo R$ 1.141,48 + GRET 150% + GHP 75% + GRAM 62,5%. Referência: janeiro/2026.', 'Benefícios não somados: auxílio-transporte R$ 100,00/mês, triênio preservado quando aplicável, diárias, indenizações e rubricas pessoais.', 'bmrj', 'SEDEC jan/2026'),
  linhaRemuneracaoOficial('SD BM — Soldado A/B/C CBMERJ', 5233.88, 0, 'Total bruto oficial: soldo R$ 991,03 + GRET 150% + GHP 75% + GRAM 62,5%. Referência: janeiro/2026.', 'Benefícios não somados: auxílio-transporte R$ 100,00/mês, triênio preservado quando aplicável, diárias, indenizações e rubricas pessoais.', 'bmrj', 'SEDEC jan/2026'),
  linhaRemuneracaoOficial('SD ALUNO BM — Soldado-Aluno CBMERJ', 2956.40, 0, 'Total bruto oficial: soldo R$ 817,67 + GRET 122,5% + GRAM 62,5%; GHP não aplicada nesta linha. Referência: janeiro/2026.', 'Benefícios e rubricas pessoais não somados; conferir edital, curso de formação e contracheque.', 'bmrj', 'SEDEC jan/2026'),
  linhaRemuneracaoOficial('ALUNO ESFO BM — Aluno EsFO CBMERJ', 4127.16, 0, 'Total bruto oficial: soldo R$ 1.141,48 + GRET 122,5% + GRAM 62,5%; GHP não aplicada nesta linha. Referência: janeiro/2026.', 'Benefícios e rubricas pessoais não somados; conferir edital, curso de formação e contracheque.', 'bmrj', 'SEDEC jan/2026')
];

const REMUNERACAO_MG_OFICIAL = {
  pmmg: [
    ['CORONEL PMMG', 21635.64], ['TENENTE CORONEL PMMG', 19515.61], ['MAJOR PMMG', 17394.91], ['CAPITÃO PMMG', 16101.58],
    ['1º TENENTE PMMG', 14324.95], ['2º TENENTE PMMG', 12170.60], ['ASPIRANTE A OFICIAL PMMG', 10932.55],
    ['CADETE — Último ano PMMG', 9743.51], ['CADETE — Demais anos PMMG', 7912.19], ['SUBTENENTE PMMG', 10932.55],
    ['1º SARGENTO PMMG', 9743.51], ['2º SARGENTO PMMG', 8505.46], ['3º SARGENTO PMMG', 7505.19],
    ['CABO PMMG', 6505.00], ['SOLDADO 1ª CLASSE PMMG', 5620.57], ['SOLDADO 2ª CLASSE (ALUNO) PMMG', 4808.66],
    ['ALUNO 1º SARGENTO PMMG', 9743.56], ['ALUNO SUBTENENTE PMMG', 10932.55]
  ].map(([cargo, valor]) => linhaRemuneracaoOficial(cargo, valor, 0, 'Subsídio/vencimento básico oficial da tabela Grupo XI — Defesa Social. Vigência: 01/01/2026.', 'Ajuda de custo para alimentação regulamentada pelo Decreto MG nº 49.006/2025; não somada por depender de regra, valor e dias efetivamente trabalhados.', 'pmmg')),
  pcmg: [
    ['Delegado de Polícia — Geral — A', 21635.64], ['Delegado de Polícia — Geral — B', 23799.18],
    ['Delegado de Polícia — Especial — A', 17402.29], ['Delegado de Polícia — Especial — B', 17529.88], ['Delegado de Polícia — Especial — C', 17665.93], ['Delegado de Polícia — Especial — D', 17803.03], ['Delegado de Polícia — Especial — E', 17941.20],
    ['Delegado de Polícia — Superior II — A', 16117.11], ['Delegado de Polícia — Superior II — B', 16407.51], ['Delegado de Polícia — Superior II — C', 16719.25], ['Delegado de Polícia — Superior II — D', 17036.93], ['Delegado de Polícia — Superior II — E', 17394.91],
    ['Delegado de Polícia — Superior I — A', 15737.60], ['Delegado de Polícia — Superior I — B', 15816.29], ['Delegado de Polícia — Superior I — C', 15895.36], ['Delegado de Polícia — Superior I — D', 15974.85], ['Delegado de Polícia — Superior I — E', 16101.58],
    ['Médico Legista — Especial — A', 15175.57], ['Médico Legista — Especial — B', 16693.11], ['Perito Criminal — Especial — A', 15175.57], ['Perito Criminal — Especial — B', 16693.11],
    ['Médico Legista — Superior III — A', 14947.06], ['Médico Legista — Superior III — B', 15003.86], ['Médico Legista — Superior III — C', 15060.88], ['Médico Legista — Superior III — D', 15118.10], ['Médico Legista — Superior III — E', 15175.56],
    ['Perito Criminal — Superior III — A', 14947.06], ['Perito Criminal — Superior III — B', 15003.85], ['Perito Criminal — Superior III — C', 15060.88], ['Perito Criminal — Superior III — D', 15118.10], ['Perito Criminal — Superior III — E', 15175.56],
    ['Médico Legista — Superior II — A', 14324.96], ['Médico Legista — Superior II — B', 14468.21], ['Médico Legista — Superior II — C', 14612.88], ['Médico Legista — Superior II — D', 14759.01], ['Médico Legista — Superior II — E', 14906.61],
    ['Perito Criminal — Superior II — A', 14324.96], ['Perito Criminal — Superior II — B', 14468.21], ['Perito Criminal — Superior II — C', 14612.88], ['Perito Criminal — Superior II — D', 14759.01], ['Perito Criminal — Superior II — E', 14906.61],
    ['Médico Legista — Superior I — A', 12170.61], ['Médico Legista — Superior I — B', 12535.72], ['Médico Legista — Superior I — C', 12911.81], ['Médico Legista — Superior I — D', 13299.15], ['Médico Legista — Superior I — E', 13698.13],
    ['Perito Criminal — Superior I — A', 12170.61], ['Perito Criminal — Superior I — B', 12535.72], ['Perito Criminal — Superior I — C', 12911.81], ['Perito Criminal — Superior I — D', 13299.15], ['Perito Criminal — Superior I — E', 13698.13],
    ['Escrivão de Polícia — Médio Especial — A', 9743.51], ['Escrivão de Polícia — Médio Especial — B', 10717.86],
    ['Investigador de Polícia — Médio/Superior Especial — A', 9743.51], ['Investigador de Polícia — Médio/Superior Especial — B', 10717.86],
    ['Escrivão de Polícia — Médio III — A', 7505.30], ['Escrivão de Polícia — Médio III — B', 7525.94], ['Escrivão de Polícia — Médio III — C', 7751.73], ['Escrivão de Polícia — Médio III — D', 7984.27], ['Escrivão de Polícia — Médio III — E', 8505.47],
    ['Investigador de Polícia — Médio/Superior III — A', 7505.30], ['Investigador de Polícia — Médio/Superior III — B', 7525.94], ['Investigador de Polícia — Médio/Superior III — C', 7751.73], ['Investigador de Polícia — Médio/Superior III — D', 7984.27], ['Investigador de Polícia — Médio/Superior III — E', 8505.47],
    ['Escrivão de Polícia — Médio II — A', 6504.99], ['Escrivão de Polícia — Médio II — B', 6667.59], ['Escrivão de Polícia — Médio II — C', 6834.29], ['Escrivão de Polícia — Médio II — D', 7005.15], ['Escrivão de Polícia — Médio II — E', 7505.19],
    ['Investigador de Polícia — Médio/Superior II — A', 6504.99], ['Investigador de Polícia — Médio/Superior II — B', 6667.59], ['Investigador de Polícia — Médio/Superior II — C', 6834.29], ['Investigador de Polícia — Médio/Superior II — D', 7005.15], ['Investigador de Polícia — Médio/Superior II — E', 7505.19],
    ['Escrivão de Polícia — Médio I — A', 5620.58], ['Escrivão de Polícia — Médio I — B', 5789.19], ['Escrivão de Polícia — Médio I — C', 5962.87], ['Escrivão de Polícia — Médio I — D', 6141.75], ['Escrivão de Polícia — Médio I — E', 6504.99],
    ['Investigador de Polícia — Médio/Superior I — A', 5620.58], ['Investigador de Polícia — Médio/Superior I — B', 5789.19], ['Investigador de Polícia — Médio/Superior I — C', 5962.86], ['Investigador de Polícia — Médio/Superior I — D', 6141.75], ['Investigador de Polícia — Médio/Superior I — E', 6504.99],
    ['Investigador de Polícia — Fundamental T — A', 5058.50], ['Investigador de Polícia — Fundamental T — B', 5353.43], ['Investigador de Polícia — Fundamental T — C', 5451.93], ['Investigador de Polícia — Fundamental T — D', 5481.34], ['Investigador de Polícia — Fundamental T — E', 5620.58]
  ].map(([cargo, valor]) => linhaRemuneracaoOficial(cargo, valor, 0, 'Vencimento básico oficial da tabela Grupo XI — Defesa Social. Vigência: 01/01/2026.', 'Ajuda de custo para alimentação regulamentada pelo Decreto MG nº 49.006/2025; não somada por depender de regra, valor e dias efetivamente trabalhados.', 'pcmg'))
};


REMUNERACAO_MG_OFICIAL.bmmg = [
  ['CEL BM — Coronel CBMMG', 21635.64, 'MG/SEPLAG 2026'],
  ['TEN CEL BM — Tenente-Coronel CBMMG', 19515.61, 'MG/SEPLAG 2026'],
  ['MAJ BM — Major CBMMG', 17394.91, 'MG/SEPLAG 2026'],
  ['CAP BM — Capitão CBMMG', 16101.58, 'MG/SEPLAG 2026'],
  ['1º TEN BM — 1º Tenente CBMMG', 14324.95, 'MG/SEPLAG 2026'],
  ['2º TEN BM — 2º Tenente CBMMG', 11547.07, 'Edital CFO 2027'],
  ['ASP OF BM — Aspirante a Oficial CBMMG', 10932.55, 'MG/SEPLAG 2026'],
  ['CADETE BM — CFO CBMMG', 7506.80, 'Edital CFO 2027'],
  ['SUBTEN BM — Subtenente CBMMG', 10932.55, 'MG/SEPLAG 2026'],
  ['1º SGT BM — 1º Sargento CBMMG', 9743.51, 'MG/SEPLAG 2026'],
  ['2º SGT BM — 2º Sargento CBMMG', 8505.46, 'MG/SEPLAG 2026'],
  ['3º SGT BM — 3º Sargento CBMMG', 7505.19, 'MG/SEPLAG 2026'],
  ['CABO BM — Cabo CBMMG', 6505.00, 'MG/SEPLAG 2026'],
  ['SD 1ª CL BM — Soldado 1ª Classe CBMMG', 5332.60, 'Edital CFSd 2027'],
  ['SD 2ª CL BM — Soldado 2ª Classe / Aluno-Soldado CBMMG', 4562.30, 'Edital CFSd 2027']
].map(([cargo, valor, badge]) => linhaRemuneracaoOficial(
  cargo,
  valor,
  0,
  'Remuneração/subsídio bruto mensal por posto/graduação. Vigência/referência 2026; ingresso conferido nos Editais CBMMG nº 09/2026 e nº 10/2026; demais postos devem ser conferidos na tabela MG/SEPLAG Grupo XI — Defesa Social e no contracheque.',
  'Ajuda de custo para alimentação por dia efetivamente trabalhado, abono fardamento e assistência médico-hospitalar, psicológica e odontológica quando previstos; benefícios, indenizações, diárias, retroativos e parcelas pessoais não foram somados automaticamente.',
  'bmmg',
  badge
));

function getTabelaCargosRemuneracao(inst) {
  const map = {
    pmesp: CARGOS_PM,    pcsp: CARGOS_PC,    ppsp: CARGOS_PPSP, pf: CARGOS_PF, prf: CARGOS_PRF,
    pmac: CARGOS_PMAC,   pmal: CARGOS_PMAL,   pcal: CARGOS_PCAL,   bmac: CARGOS_BMAC,   bmal: CARGOS_BMAL,   bmam: CARGOS_BMAM,   bmap: CARGOS_BMAP,   pcac: CARGOS_PCAC,   ppac: CARGOS_PPAC,   ppal: CARGOS_PPAL,
    pmerj: CARGOS_PMERJ, bmrj: CARGOS_BMRJ, pcerj: CARGOS_PCERJ, pprj: CARGOS_PPRJ,
    pmmg: CARGOS_PMMG,   bmmg: CARGOS_BMMG,   pcmg: CARGOS_PCMG,   ppmg: CARGOS_PPMG,
    pmba: CARGOS_PMBA,   bmba: CARGOS_BMBA,   pcba: CARGOS_PCBA,   ppba: CARGOS_PPBA,
    pmpr: CARGOS_PMPR,   bmpr: CARGOS_BMPR,   pcpr: CARGOS_PCPR,   pppr: CARGOS_PPPR,
    pmrs: CARGOS_PMRS,   pcrs: CARGOS_PCRS,   pprs: CARGOS_PPRS,
    pmsc: CARGOS_PMSC,   bmsc: CARGOS_BMSC,   pcsc: CARGOS_PCSC,   ppsc: CARGOS_PPSC,
    pmes: CARGOS_PMES,   bmes: CARGOS_BMES,   pces: CARGOS_PCES,   ppes: CARGOS_PPES,
    pmms: CARGOS_PMMS,   bmms: CARGOS_BMMS,   pcms: CARGOS_PCMS,   ppms: CARGOS_PPMS,
    pmmt: CARGOS_PMMT,   bmmt: CARGOS_BMMT,   pcmt: CARGOS_PCMT,   ppmt: CARGOS_PPMT,};
  const instNorm = normalizarInstituicao(inst);
  return CARGOS_ESTRUTURA_GENERICAS[instNorm] || map[instNorm] || CARGOS_PM;
}

function calcularRemuneracaoTabelada(inst, cargo) {
  inst = normalizarInstituicao(inst);
  const padrao = Number(cargo.padrao || 0);
  const gratif = Number(cargo.gratif || 0);
  let remuneracao = padrao + gratif;
  let beneficios = 0;
  let criterio = 'Vencimento/subsídio bruto mensal do cargo.';
  let benefDesc = 'Benefício fixo geral não somado.';
  let fonteKey = inst;
  let badge = cargo.oficial ? 'Fonte oficial' : 'Carreira operacional';

  if (isPoliciaPenal(inst)) {
    remuneracao = padrao;
    beneficios = Number(cargo.beneficios || 0);
    criterio = cargo.criterio || 'Remuneração bruta mensal de referência da tabela oficial da Polícia Penal.';
    benefDesc = cargo.benefDesc || 'Auxílios, adicionais, plantões e parcelas indenizatórias dependem de lei, escala, lotação e situação funcional; não foram somados automaticamente.';
    fonteKey = cargo.fonteKey || inst;
    badge = cargo.badge || 'Fonte oficial';
  } else if (inst === 'pf' || inst === 'prf') {
    remuneracao = padrao;
    beneficios = Number(cargo.beneficios || 0);
    criterio = cargo.criterio || 'Subsídio federal mensal da carreira, conforme tabela remuneratória federal vigente.';
    benefDesc = cargo.benefDesc || 'Benefícios e indenizações federais não somados automaticamente; dependem da legislação, lotação, exercício, faixa aplicável e situação funcional.';
    fonteKey = cargo.fonteKey || inst;
    badge = cargo.valorPendente || padrao <= 0 ? 'Dados em breve' : (cargo.badge || 'Federal 2026');
  } else if (inst === 'pcal') {
    remuneracao = padrao;
    beneficios = Number(cargo.beneficios || 0);
    criterio = cargo.criterio || 'Subsídio bruto mensal de referência da PCAL por cargo/classe/referência; valores estimados devem ser confirmados em tabela oficial, ficha financeira e contracheque.';
    benefDesc = cargo.benefDesc || 'Plantões, adicional noturno, diárias, acúmulo extraordinário, representação, indenizações, função, retroativos e parcelas pessoais dependem de lei, ato, escala, lotação e contracheque; não foram somados automaticamente.';
    fonteKey = cargo.fonteKey || 'pcal';
    badge = cargo.valorPendente || padrao <= 0 ? 'Dados em breve' : (cargo.badge || 'PCAL estimado');
  } else if (inst === 'pmac' || inst === 'pmal' || inst === 'bmac' || inst === 'bmal' || inst === 'bmam' || inst === 'bmap') {
    remuneracao = padrao;
    beneficios = Number(cargo.beneficios || 0);
    criterio = cargo.criterio || 'Total bruto mensal de referência para militares estaduais, conforme tabela remuneratória cadastrada para a instituição.';
    benefDesc = cargo.benefDesc || 'Adicionais, auxílios, indenizações, banco de horas, serviço complementar, serviço voluntário, chefia, localização especial e rubricas pessoais dependem de lei local, escala, lotação, ato e contracheque; não foram somados automaticamente.';
    fonteKey = cargo.fonteKey || inst;
    badge = cargo.valorPendente || padrao <= 0 ? 'Estimativa pendente' : (cargo.badge || 'Tabela remuneratória estadual');
  } else if (inst === 'pmms') {
    remuneracao = padrao;
    beneficios = 0;
    criterio = cargo.criterio || 'Tabela salarial militar de Mato Grosso do Sul por posto/graduação e nível; confirmar DOE/MS, edital ou contracheque para rubricas individuais.';
    benefDesc = cargo.benefDesc || 'Auxílios, adicionais, fardamento, indenizações e verbas por escala/lotação dependem da legislação estadual, ato administrativo e contracheque; não foram somados automaticamente.';
    fonteKey = cargo.fonteKey || 'pmms';
    badge = cargo.valorPendente || padrao <= 0 ? 'Dados em breve' : (cargo.badge || 'Tabela 05/2025');
  } else if (inst === 'bmms') {
    remuneracao = padrao;
    beneficios = 0;
    criterio = cargo.criterio || 'Subsídio do CBMMS por posto/graduação e nível, com RGA 2026 aplicada; confirmar DOE/MS, edital ou contracheque para rubricas individuais.';
    benefDesc = cargo.benefDesc || 'Ajuda de custo, fardamento, indenizações, adicionais por função/lotação, diárias e rubricas pessoais dependem da legislação estadual, ato administrativo e contracheque; não foram somados automaticamente.';
    fonteKey = cargo.fonteKey || 'bmms';
    badge = cargo.valorPendente || padrao <= 0 ? 'Dados em breve' : (cargo.badge || 'RGA 2026');
  } else if (inst === 'pcms') {
    remuneracao = padrao;
    beneficios = 0;
    criterio = cargo.criterio || 'Tabela legal/edital da Polícia Civil de Mato Grosso do Sul; conferir DOE/MS, edital vigente e contracheque para a situação individual.';
    benefDesc = cargo.benefDesc || 'Abonos, adicionais, plantões, indenizações e outras rubricas dependem da legislação estadual, lotação, escala e contracheque; não foram somados automaticamente.';
    fonteKey = cargo.fonteKey || 'pcms';
    badge = cargo.valorPendente || padrao <= 0 ? 'Dados em breve' : (cargo.badge || 'Fonte oficial');
  } else if (inst === 'pmmt') {
    remuneracao = padrao;
    beneficios = 0;
    criterio = cargo.criterio || 'Referência de edital/portal oficial da PMMT; postos sem valor confirmado ficam como "Dados em breve".';
    benefDesc = cargo.benefDesc || 'Adicionais, indenizações, etapas, auxílio, escala, fardamento e demais rubricas dependem da legislação estadual, lotação, escala e contracheque; não foram somados automaticamente.';
    fonteKey = cargo.fonteKey || 'pmmt';
    badge = cargo.valorPendente || padrao <= 0 ? 'Dados em breve' : (cargo.badge || 'Edital/portal oficial');
  } else if (inst === 'bmmt') {
    remuneracao = padrao;
    beneficios = 0;
    criterio = cargo.criterio || 'Subsídio bruto mensal de referência do CBMMT por posto/graduação e nível. Conferir LC MT 541/2014, Lei MT 12.007/2023, RGA 2026, edital, ato de enquadramento e contracheque.';
    benefDesc = cargo.benefDesc || 'Etapa alimentação, fardamento, indenizações, diárias, serviço extraordinário, temporários, PTTC, função e rubricas pessoais dependem de lei, escala, lotação, ato administrativo e contracheque; não foram somados automaticamente.';
    fonteKey = cargo.fonteKey || 'bmmt';
    badge = cargo.valorPendente || padrao <= 0 ? 'Dados em breve' : (cargo.badge || 'CBMMT/MT');
  } else if (inst === 'pcmt') {
    remuneracao = padrao;
    beneficios = 0;
    criterio = cargo.criterio || 'Tabela salarial do Portal do Servidor/SEPLAG-MT usada para referências cadastradas da PCMT; cargos sem tabela específica confirmada ficam como "Dados em breve".';
    benefDesc = cargo.benefDesc || 'Adicionais, plantões, indenizações, verbas de escala e demais rubricas dependem da legislação estadual, lotação, escala e contracheque; não foram somados automaticamente.';
    fonteKey = cargo.fonteKey || 'pcmt';
    badge = cargo.valorPendente || padrao <= 0 ? 'Dados em breve' : (cargo.badge || 'Tabela 2025');
  } else if (inst === 'pmerj' || inst === 'bmrj') {
    const gret = padrao * Number(cargo.gretPct || 0);
    const ghp = padrao * Number(cargo.ghpPct || 0);
    const gram = (padrao + gret + ghp) * 0.625;
    remuneracao = padrao + gret + ghp + gram;
    beneficios = 0;
    criterio = inst === 'bmrj' ? 'Soldo + GRET + GHP + GRAM, conforme tabela remuneratória SEDEC/CBMERJ.' : 'Soldo + GRET + GHP + GRAM, conforme tabela remuneratória SEPM/RJ.';
    benefDesc = inst === 'bmrj' ? 'Benefícios gerais não somados nesta linha; a tabela oficial da SEDEC apresenta remuneração por parcelas.' : 'Benefícios gerais não somados nesta linha; a tabela oficial da SEPM apresenta remuneração por parcelas.';
  } else if (inst === 'pcerj') {
    const aapOuRepresentacao = cargo.delegado
      ? padrao * Number(cargo.representacaoPct || 2.12)
      : padrao * Number(cargo.aapPct || 2.30);
    const ghp = padrao * Number(cargo.ghpPct || 0);
    const gatc = padrao * Number(cargo.gatcPct || 0);
    remuneracao = padrao + aapOuRepresentacao + ghp + gatc;
    beneficios = 804;
    criterio = cargo.delegado
      ? 'VB + verba de representação + GHP máxima, conforme tabela SEPOL/RJ.'
      : 'VB + AAP + GHP máxima + GATC quando aplicável, conforme tabela SEPOL/RJ.';
    benefDesc = 'Auxílio alimentação R$ 704,00/mês + auxílio transporte R$ 100,00.';
  } else if (inst === 'pmpr' || inst === 'bmpr' || inst === 'pcpr') {
    remuneracao = padrao;
    beneficios = AUX_ALIM_PR_PADRAO;
    criterio = inst === 'bmpr' ? 'Subsídio bruto mensal do CBMPR por posto/graduação e classe, conforme Lei PR nº 22.187/2024.' : 'Subsídio bruto mensal por cargo/classe.';
    benefDesc = inst === 'bmpr' ? `Auxílio-alimentação oficial PR: ${fmt(AUX_ALIM_PR_PADRAO)}; FASPM facultativo, contribuição militar, diárias, indenizações e parcelas pessoais não somadas automaticamente.` : `Auxílio-alimentação oficial PR: ${fmt(AUX_ALIM_PR_PADRAO)}.`;
  } else if (inst === 'pmrs') {
    remuneracao = padrao;
    beneficios = AUX_ALIM_RS_BM;
    criterio = 'Remuneração bruta mensal de referência por posto/graduação conforme RHE/RS 11/2025 e editais oficiais BMRS 2025 para linhas de ingresso.';
    benefDesc = `Auxílio-alimentação BM/RS informado em edital: ${fmt(AUX_ALIM_RS_BM)}.`;
  } else if (inst === 'pcrs') {
    remuneracao = padrao;
    beneficios = 0;
    criterio = 'Subsídio/vencimento bruto mensal por cargo/classe conforme editais PCRS 2025, tabelas de carreira e relação RHE/RS 11/2025.';
    benefDesc = 'Adicionais, indenizações e auxílios dependem de rubrica, lotação e situação funcional; não somados automaticamente.';
  } else if (inst === 'pmsc') {
    remuneracao = padrao;
    beneficios = AUX_ALIM_SC_PADRAO;
    criterio = 'Subsídio bruto mensal por posto/graduação conforme LC SC 765/2020, LC SC 776/2021, LC SC 872/2025 e LC SC 880/2025.';
    benefDesc = `Auxílio-alimentação SC de referência: ${fmt(AUX_ALIM_SC_PADRAO)}; verba indenizatória não somada automaticamente ao bruto.`;
  } else if (inst === 'bmsc') {
    remuneracao = padrao;
    beneficios = AUX_ALIM_SC_PADRAO;
    criterio = cargo.criterio || 'Subsídio bruto mensal do CBMSC por posto/graduação; valores marcados como estimados devem ser confirmados em tabela oficial consolidada ou contracheque.';
    benefDesc = cargo.benefDesc || `Auxílio-alimentação SC de referência: ${fmt(AUX_ALIM_SC_PADRAO)}; verba indenizatória não somada automaticamente ao bruto.`;
    fonteKey = cargo.fonteKey || 'bmsc';
    badge = cargo.badge || 'CBMSC 2026';
  } else if (inst === 'pcsc') {
    remuneracao = padrao;
    beneficios = AUX_ALIM_SC_PADRAO;
    criterio = 'Subsídio bruto mensal por cargo/classe conforme LC SC 765/2020, LC SC 776/2021, LC SC 872/2025 e estatuto da PCSC; Agente/Escrivão conferidos nos editais PCSC 2025.';
    benefDesc = `Auxílio-alimentação SC de referência: ${fmt(AUX_ALIM_SC_PADRAO)}; nos editais PCSC 2025 aparece compondo o total divulgado de Agente e Escrivão.`;
  } else if (inst === 'pmes') {
    remuneracao = padrao;
    beneficios = AUX_ALIM_ES_PADRAO;
    criterio = 'Subsídio bruto mensal por posto/graduação conforme regime de subsídio dos militares estaduais do ES, tabela PM/CBM a partir de 01/12/2025 e editais PMES para linhas de formação.';
    benefDesc = `Auxílio-alimentação ES de referência: ${fmt(AUX_ALIM_ES_PADRAO)}; não somado automaticamente ao bruto. Auxílio-fardamento e serviço extraordinário dependem de regra, escala e situação funcional.`;
  } else if (inst === 'bmes') {
    remuneracao = padrao;
    beneficios = AUX_ALIM_ES_PADRAO;
    criterio = cargo.criterio || 'Subsídio bruto mensal do CBMES por posto/graduação e referência; tabela PM/CBM ES a partir de 01/12/2025, com linhas de oficiais superiores 2026 quando marcadas.';
    benefDesc = cargo.benefDesc || `Auxílio-alimentação ES de referência: ${fmt(AUX_ALIM_ES_PADRAO)}; não somado automaticamente ao bruto. GSE, fardamento, diárias, indenizações e rubricas pessoais dependem de ato, escala, lotação e contracheque.`;
    fonteKey = cargo.fonteKey || 'bmes';
    badge = cargo.badge || 'CBMES/ES';
  } else if (inst === 'pces') {
    remuneracao = padrao;
    beneficios = AUX_ALIM_ES_PADRAO;
    criterio = 'Subsídio bruto mensal por cargo/categoria/referência conforme tabelas de Delegado, OIP/PCES e carreiras periciais PCIES vinculadas à legislação estadual do ES.';
    benefDesc = `Auxílio-alimentação ES de referência: ${fmt(AUX_ALIM_ES_PADRAO)}; não somado automaticamente ao bruto. Para carreiras por subsídio, vantagens pessoais podem estar absorvidas conforme opção/regime legal.`;
  }

  return { remuneracao, beneficios, total: remuneracao + beneficios, criterio, benefDesc, fonteKey, badge };
}

function gerarRemuneracaoTabelada(inst) {
  inst = normalizarInstituicao(inst);
  if (REMUNERACAO_SP_OFICIAL[inst]) return REMUNERACAO_SP_OFICIAL[inst];
  if (REMUNERACAO_MG_OFICIAL[inst]) return REMUNERACAO_MG_OFICIAL[inst];

  if (inst === 'pmba' || inst === 'bmba') {
    const refs = ['I', 'II', 'III', 'IV', 'V'];
    const cargosBa = inst === 'bmba' && typeof CARGOS_BMBA !== 'undefined' ? CARGOS_BMBA : CARGOS_PMBA;
    return cargosBa.flatMap(cargo => (cargo.gapBa || [0]).map((gap, idx) => {
      const remuneracao = Number(cargo.padrao || 0) + Number(gap || 0);
      const isAluno = /aluno/i.test(cargo.text || '') && Number(gap || 0) === 0;
      return linhaRemuneracaoOficial(
        isAluno ? `${cargo.text} — referência de formação` : `${cargo.text} — GAP Ref. ${refs[idx] || (idx + 1)}`,
        remuneracao,
        256.18,
        isAluno
          ? 'Valor de formação inserido como estimativa operacional do site; conferir edital vigente, curso de formação e ato de matrícula antes de uso individual.'
          : `Soldo oficial + GAP Referência ${refs[idx] || (idx + 1)}. Valores de soldo com efeito em 01/05/2026 e GAP com efeito em 01/06/2026, nos termos da Lei BA nº 14.890/2025.`,
        'Auxílio-fardamento oficial mensal: R$ 256,18. Auxílio-alimentação, CET, serviço extraordinário, diárias, função, indenizações, parcelas pessoais e retroativos não foram somados; dependem de lei, escala, lotação, ato e contracheque.',
        inst,
        cargo.oficial ? 'Fonte oficial' : 'Carreira operacional'
      );
    }));
  }


  if (inst === 'pcba') {
    const refs = ['I', 'II', 'III', 'IV', 'V'];
    return CARGOS_PCBA.flatMap(cargo => (cargo.gratBa || [0]).map((grat, idx) => {
      const remuneracao = Number(cargo.padrao || 0) + Number(grat || 0);
      return linhaRemuneracaoOficial(
        `${cargo.text} — ${cargo.gratBaLabel || 'GAJ/GAPJ'} Ref. ${refs[idx] || (idx + 1)}`,
        remuneracao,
        0,
        `${cargo.gratBaLabel || 'GAJ/GAPJ'} Referência ${refs[idx] || (idx + 1)}. Valores com efeito em 01/06/2026.`,
        'Benefício fixo geral não somado nesta fonte oficial.',
        'pcba',
        cargo.oficial ? 'Fonte oficial' : 'Carreira operacional'
      );
    }));
  }

  return getTabelaCargosRemuneracao(inst).map(cargo => {
    const calc = calcularRemuneracaoTabelada(inst, cargo);
    const cargoLabel = cargo.text || cargo.nome || cargo.cargo || cargo.label || cargo.id || cargo.val || 'Cargo não identificado';
    return linhaRemuneracaoOficial(cargoLabel, calc.remuneracao, calc.beneficios, calc.criterio, calc.benefDesc, calc.fonteKey, calc.badge);
  });
}

function remuneracaoUrlSegura(valor) {
  const url = String(valor || '').trim();
  return /^https?:\/\//i.test(url) ? url : '#';
}

function formatarAdicionaisRemuneracaoHtml(inst, linha = {}) {
  const resumo = String(getAdicionaisRemuneracaoResumo(inst, linha) || '').replace(/\s+/g, ' ').trim();

  if (!resumo) {
    return '<span class="adicionais-vazio">Sem adicionais ou auxílios específicos cadastrados para esta linha.</span>';
  }

  const partes = resumo
    .split(/;\s+|\.\s+/)
    .map(parte => parte.trim().replace(/[.;]$/, ''))
    .filter(Boolean);

  const itens = partes.length ? partes : [resumo];

  return `<ul class="adicionais-lista">${itens.map(texto => {
    const match = texto.match(/^([^:]{2,52}):\s*(.+)$/);
    if (match) {
      return `<li><strong>${escapeHtml(match[1])}:</strong> ${escapeHtml(match[2])}</li>`;
    }
    return `<li>${escapeHtml(texto)}</li>`;
  }).join('')}</ul>`;
}

function carregarRemuneracaoTabelada() {
  const tbody = document.getElementById('lista-remuneracao');
  if (!tbody) return;
  if (typeof instituicaoConsultaFoiSelecionada === 'function' && !instituicaoConsultaFoiSelecionada()) {
    if (typeof mostrarAvisoSelecaoInstituicao === 'function') mostrarAvisoSelecaoInstituicao('remuneracao');
    return;
  }
  const inst = normalizarInstituicao(currInst);

  const linhas = gerarRemuneracaoTabelada(inst);

  if (!linhas.length) {
    tbody.innerHTML = '<tr><td colspan="4">Não há dados cadastrados para esta instituição.</td></tr>';
    return;
  }

  const remuneracoes = linhas.map(l => l.remuneracao).filter(v => Number(v) > 0);
  const menor = remuneracoes.length ? Math.min(...remuneracoes) : 0;
  const maior = remuneracoes.length ? Math.max(...remuneracoes) : 0;

  const elTotal = document.getElementById('remu-total-cargos');
  const elMenor = document.getElementById('remu-menor-total');
  const elMaior = document.getElementById('remu-maior-total');
  if (elTotal) elTotal.textContent = String(linhas.length);
  if (elMenor) elMenor.textContent = menor ? fmt(menor) : 'Dados em breve';
  if (elMaior) elMaior.textContent = maior ? fmt(maior) : 'Dados em breve';

  tbody.innerHTML = linhas.map(l => {
    const fonte = REMUNERACAO_FONTES_OFICIAIS[l.fonteKey] || REMUNERACAO_FONTES_OFICIAIS[inst] || { nome: 'Fonte oficial da carreira', url: '#' };
    return `
      <tr>
        <td>
          <strong>${escapeHtml(l.cargo)}</strong>
          <br><span class="remuneracao-badge">${escapeHtml(l.badge || 'Fonte oficial')}</span>
        </td>
        <td class="valor">${l.valorPendente ? 'Dados em breve' : fmt(l.remuneracao)}</td>
        <td class="adicionais">${formatarAdicionaisRemuneracaoHtml(inst, l)}</td>
        <td>
          ${escapeHtml(l.criterio || '')}<br>
          <span class="remuneracao-fonte">${escapeHtml(fonte.nome)}</span><br>
          <a class="remuneracao-link" href="${escapeHtml(remuneracaoUrlSegura(fonte.url))}" target="_blank" rel="noopener noreferrer">Abrir fonte oficial</a>
        </td>
      </tr>
    `;
  }).join('');
}


/* ============================================================ */
