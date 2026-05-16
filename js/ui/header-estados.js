/* Módulo organizado por responsabilidade — Troca de instituição, estados, cabeçalho e estrutura de UFs.
   Mantém a ordem original para preservar compatibilidade. */

/* === TROCA INSTITUIÇÃO ====================================== */
/* ============================================================ */

const HEADER_ESTADOS = {
  ac: {
    nome: 'Acre',
    sigla: 'AC',
    pm: 'pmac',
    bm: 'bmac',
    pc: 'pcac',
    pp: 'ppac',
    flag: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira_do_Acre.svg'
  },
  al: {
    nome: 'Alagoas',
    sigla: 'AL',
    pm: 'pmal',
    bm: 'bmal',
    pc: 'pcal',
    pp: 'ppal',
    flag: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira_de_Alagoas.svg'
  },
  am: {
    nome: 'Amazonas',
    sigla: 'AM',
    pm: 'pmam',
    bm: 'bmam',
    pc: 'pcam',
    pp: 'ppam',
    flag: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira_do_Amazonas.svg'
  },
  ap: {
    nome: 'Amapá',
    sigla: 'AP',
    pm: 'pmap',
    bm: 'bmap',
    pc: 'pcap',
    pp: 'ppap',
    flag: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira_do_Amap%C3%A1.svg'
  },
  sp: {
    nome: 'São Paulo',
    sigla: 'SP',
    pm: 'pmesp',
    pc: 'pcsp',
    pp: 'ppsp',
    flag: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira_do_estado_de_S%C3%A3o_Paulo.svg'
  },
  rj: {
    nome: 'Rio de Janeiro',
    sigla: 'RJ',
    pm: 'pmerj',
    bm: 'bmrj',
    pc: 'pcerj',
    pp: 'pprj',
    flag: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira_do_estado_do_Rio_de_Janeiro.svg'
  },
  mg: {
    nome: 'Minas Gerais',
    sigla: 'MG',
    pm: 'pmmg',
    bm: 'bmmg',
    pc: 'pcmg',
    pp: 'ppmg',
    flag: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira_de_Minas_Gerais.svg'
  },
  ba: {
    nome: 'Bahia',
    sigla: 'BA',
    pm: 'pmba',
    pc: 'pcba',
    pp: 'ppba',
    flag: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira_da_Bahia.svg'
  },
  ce: {
    nome: 'Ceará',
    sigla: 'CE',
    pm: 'pmce',
    pc: 'pcce',
    pp: 'ppce',
    flag: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira_do_Cear%C3%A1.svg'
  },
  pr: {
    nome: 'Paraná',
    sigla: 'PR',
    pm: 'pmpr',
    bm: 'bmpr',
    pc: 'pcpr',
    pp: 'pppr',
    flag: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira_do_Paran%C3%A1.svg'
  },
  rs: {
    nome: 'Rio Grande do Sul',
    sigla: 'RS',
    pm: 'pmrs',
    pc: 'pcrs',
    pp: 'pprs',
    flag: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira_do_Rio_Grande_do_Sul.svg'
  },
  sc: {
    nome: 'Santa Catarina',
    sigla: 'SC',
    pm: 'pmsc',
    bm: 'bmsc',
    pc: 'pcsc',
    pp: 'ppsc',
    flag: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira_de_Santa_Catarina.svg'
  },
  es: {
    nome: 'Espírito Santo',
    sigla: 'ES',
    pm: 'pmes',
    bm: 'bmes',
    pc: 'pces',
    pp: 'ppes',
    flag: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira_do_Esp%C3%ADrito_Santo.svg'
  },
  ms: {
    nome: 'Mato Grosso do Sul',
    sigla: 'MS',
    pm: 'pmms',
    bm: 'bmms',
    pc: 'pcms',
    pp: 'ppms',
    flag: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira_de_Mato_Grosso_do_Sul.svg'
  },
  mt: {
    nome: 'Mato Grosso',
    sigla: 'MT',
    pm: 'pmmt',
    bm: 'bmmt',
    pc: 'pcmt',
    pp: 'ppmt',
    flag: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira_de_Mato_Grosso.svg'
  }
};

const HEADER_INSTITUICOES_INFO = {
  pmac: { titulo: 'PMAC', desc: 'Polícia Militar do Acre' },
  pmal: { titulo: 'PMAL', desc: 'Polícia Militar do Estado de Alagoas' },
  pmam: { titulo: 'PMAM', desc: 'Polícia Militar do Estado do Amazonas' },
  pcam: { titulo: 'PCAM', desc: 'Polícia Civil do Estado do Amazonas' },
  pcap: { titulo: 'PCAP', desc: 'Polícia Civil do Estado do Amapá' },
  pcce: { titulo: 'PCCE', desc: 'Polícia Civil do Estado do Ceará' },
  pmap: { titulo: 'PMAP', desc: 'Polícia Militar do Estado do Amapá' },
  pcal: { titulo: 'PCAL', desc: 'Polícia Civil do Estado de Alagoas' },
  ppal: { titulo: 'PPAL', desc: 'Polícia Penal do Estado de Alagoas' },
  bmac: { titulo: 'BMAC', desc: 'Corpo de Bombeiros Militar do Acre' },
  pcac: { titulo: 'PCAC', desc: 'Polícia Civil do Acre' },
  ppac: { titulo: 'PPAC', desc: 'Polícia Penal do Acre' },
  pmesp: { titulo: 'PMESP', desc: 'Polícia Militar do Estado de São Paulo' },
  pcsp:  { titulo: 'PCSP',  desc: 'Polícia Civil do Estado de São Paulo' },
  pmerj: { titulo: 'PMERJ', desc: 'Polícia Militar do Rio de Janeiro' },
  bmrj: { titulo: 'CBMERJ', desc: 'Corpo de Bombeiros Militar do Estado do Rio de Janeiro' },
  pcerj: { titulo: 'PCERJ', desc: 'Polícia Civil do Rio de Janeiro' },
  pmmg:  { titulo: 'PMMG',  desc: 'Polícia Militar de Minas Gerais' },
  bmmg:  { titulo: 'CBMMG', desc: 'Corpo de Bombeiros Militar de Minas Gerais' },
  pcmg:  { titulo: 'PCMG',  desc: 'Polícia Civil de Minas Gerais' },
  pmba:  { titulo: 'PMBA',  desc: 'Polícia Militar da Bahia' },
  pcba:  { titulo: 'PCBA',  desc: 'Polícia Civil da Bahia' },
  pmpr:  { titulo: 'PMPR',  desc: 'Polícia Militar do Paraná' },
  bmpr: { titulo: 'CBMPR', desc: 'Corpo de Bombeiros Militar do Paraná' },
  pcpr:  { titulo: 'PCPR',  desc: 'Polícia Civil do Paraná' },
  pmrs:  { titulo: 'PMRS',  desc: 'Brigada Militar do Rio Grande do Sul' },
  pcrs:  { titulo: 'PCRS',  desc: 'Polícia Civil do Rio Grande do Sul' },
  pmsc:  { titulo: 'PMSC',  desc: 'Polícia Militar de Santa Catarina' },
  bmsc:  { titulo: 'CBMSC', desc: 'Corpo de Bombeiros Militar de Santa Catarina' },
  pcsc:  { titulo: 'PCSC',  desc: 'Polícia Civil de Santa Catarina' },
  pmes:  { titulo: 'PMES',  desc: 'Polícia Militar do Espírito Santo' },
  bmes:  { titulo: 'CBMES', desc: 'Corpo de Bombeiros Militar do Estado do Espírito Santo' },
  pces:  { titulo: 'PCES',  desc: 'Polícia Civil do Espírito Santo' },
  ppsp: { titulo: 'PPSP', desc: 'Polícia Penal do Estado de São Paulo — PPESP/PPSP' },
  pprj: { titulo: 'PPRJ', desc: 'Polícia Penal do Rio de Janeiro' },
  ppmg: { titulo: 'PPMG', desc: 'Polícia Penal de Minas Gerais' },
  ppba: { titulo: 'PPBA', desc: 'Polícia Penal da Bahia' },
  pppr: { titulo: 'PPPR', desc: 'Polícia Penal do Paraná' },
  pprs: { titulo: 'PPRS', desc: 'Polícia Penal do Rio Grande do Sul' },
  ppsc: { titulo: 'PPSC', desc: 'Polícia Penal de Santa Catarina' },
  ppes: { titulo: 'PPES', desc: 'Polícia Penal do Espírito Santo' },
  pmms: { titulo: 'PMMS', desc: 'Polícia Militar de Mato Grosso do Sul' },
  bmms: { titulo: 'CBMMS', desc: 'Corpo de Bombeiros Militar de Mato Grosso do Sul' },
  pcms: { titulo: 'PCMS', desc: 'Polícia Civil de Mato Grosso do Sul' },
  ppms: { titulo: 'PPMS', desc: 'Polícia Penal de Mato Grosso do Sul' },
  pmmt: { titulo: 'PMMT', desc: 'Polícia Militar de Mato Grosso' },
  bmmt: { titulo: 'CBMMT', desc: 'Corpo de Bombeiros Militar do Estado de Mato Grosso' },
  pcmt: { titulo: 'PCMT', desc: 'Polícia Judiciária Civil de Mato Grosso' },
  ppmt: { titulo: 'PPMT', desc: 'Polícia Penal de Mato Grosso' },
  pcdf: { titulo: 'PCDF', desc: 'Polícia Civil do Distrito Federal' }
};

const HEADER_INSTITUICOES_IMAGENS = {
  pmac: 'img/MILITAR/pmac.webp',
  pmal: 'img/MILITAR/pmal.webp',
  pmam: 'img/MILITAR/pmam.webp',
  pmap: 'img/MILITAR/pmap.webp',
  pmpa: 'img/MILITAR/pmpa.webp',
  pmce: 'img/MILITAR/pmce.webp',
  pmpb: 'img/MILITAR/pmpb.webp',
  pmpe: 'img/MILITAR/pmpe.webp',
  pmpi: 'img/MILITAR/pmpi.webp',
  pmrn: 'img/MILITAR/pmrn.webp',
  pmro: 'img/MILITAR/pmro.webp',
  pmrr: 'img/MILITAR/pmrr.webp',
  pmse: 'img/MILITAR/pmse.webp',
  pmba: 'img/MILITAR/pmba.webp',
  pmdf: 'img/MILITAR/pmdf.webp',
  pmerj: 'img/MILITAR/pmerj.webp',
  pmes: 'img/MILITAR/pmes.webp',
  pmesp: 'img/MILITAR/pmesp.webp',
  pmgo: 'img/MILITAR/pmgo.webp',
  pmma: 'img/MILITAR/pmma.webp',
  pmmg: 'img/MILITAR/pmmg.webp',
  pmms: 'img/MILITAR/pmms.webp',
  pmmt: 'img/MILITAR/pmmt.webp',
  pmpr: 'img/MILITAR/pmpr.webp',
  pmrs: 'img/MILITAR/pmrs.webp',
  pmsc: 'img/MILITAR/pmsc.webp',
  pmto: 'img/MILITAR/pmto.webp',
  pcac: 'img/CIVIL/pcac.webp',
  pcal: 'img/CIVIL/pcal.webp',
  pcam: 'img/CIVIL/pcam.webp',
  pcba: 'img/CIVIL/pcba.webp',
  pcap: 'img/CIVIL/pcap.webp',
  pcce: 'img/CIVIL/pcce.webp',
  pcpb: 'img/CIVIL/pcpb.webp',
  pcpi: 'img/CIVIL/pcpi.webp',
  pcpe: 'img/CIVIL/pcpe.webp',
  pcrn: 'img/CIVIL/pcrn.webp',
  pcro: 'img/CIVIL/pcro.webp',
  pcrr: 'img/CIVIL/pcrr.webp',
  pcse: 'img/CIVIL/pcse.webp',
  pcdf: 'img/CIVIL/pcdf.webp',
  pcgo: 'img/CIVIL/pcgo.webp',
  pcerj: 'img/CIVIL/pcrj.webp',
  pces: 'img/CIVIL/pces.webp',
  pcma: 'img/CIVIL/pcma.webp',
  pcpa: 'img/CIVIL/pcpa.webp',
  pcmg: 'img/CIVIL/pcmg.webp',
  pcms: 'img/CIVIL/pcms.webp',
  pcmt: 'img/CIVIL/pcmt.webp',
  pcpr: 'img/CIVIL/pcpr.webp',
  pcrs: 'img/CIVIL/pcrs.webp',
  pcsc: 'img/CIVIL/pcsc.webp',
  pcsp: 'img/CIVIL/pcsp.webp',
  pcto: 'img/CIVIL/pcto.webp',
  ppac: 'img/PENAL/ppac.webp',
  ppal: 'img/PENAL/ppal.webp',
  ppam: 'img/PENAL/ppam.webp',
  ppap: 'img/PENAL/ppap.webp',
  ppba: 'img/PENAL/ppba.webp',
  ppce: 'img/PENAL/ppce.webp',
  ppdf: 'img/PENAL/ppdf.webp',
  ppes: 'img/PENAL/ppes.webp',
  ppgo: 'img/PENAL/ppgo.webp',
  ppma: 'img/PENAL/ppma.webp',
  ppmg: 'img/PENAL/ppmg.webp',
  ppms: 'img/PENAL/ppms.webp',
  ppmt: 'img/PENAL/ppmt.webp',
  pppa: 'img/PENAL/pppa.webp',
  pppb: 'img/PENAL/pppb.webp',
  pppe: 'img/PENAL/pppe.webp',
  pppi: 'img/PENAL/pppi.webp',
  pppr: 'img/PENAL/pppr.webp',
  pprj: 'img/PENAL/pprj.webp',
  pprn: 'img/PENAL/pprn.webp',
  ppro: 'img/PENAL/ppro.webp',
  pprr: 'img/PENAL/pprr.webp',
  pprs: 'img/PENAL/pprs.webp',
  ppsc: 'img/PENAL/ppsc.webp',
  ppse: 'img/PENAL/ppse.webp',
  ppsp: 'img/PENAL/ppsp.webp',
  ppto: 'img/PENAL/ppto.webp',
  bmac: 'img/BOMBEIRO/bmac.webp',
  bmal: 'img/BOMBEIRO/bmal.webp',
  bmam: 'img/BOMBEIRO/bmam.webp',
  bmap: 'img/BOMBEIRO/bmap.webp',
  bmba: 'img/BOMBEIRO/bmba.webp',
  bmce: 'img/BOMBEIRO/bmce.webp',
  bmdf: 'img/BOMBEIRO/bmdf.webp',
  bmes: 'img/BOMBEIRO/bmes.webp',
  bmgo: 'img/BOMBEIRO/bmgo.webp',
  bmma: 'img/BOMBEIRO/bmma.webp',
  bmmg: 'img/BOMBEIRO/bmmg.webp',
  bmms: 'img/BOMBEIRO/bmms.webp',
  bmmt: 'img/BOMBEIRO/bmmt.webp',
  bmpa: 'img/BOMBEIRO/bmpa.webp',
  bmpb: 'img/BOMBEIRO/bmpb.webp',
  bmpe: 'img/BOMBEIRO/bmpe.webp',
  bmpi: 'img/BOMBEIRO/bmpi.webp',
  bmpr: 'img/BOMBEIRO/bmpr.webp',
  bmrj: 'img/BOMBEIRO/bmrj.webp',
  bmrn: 'img/BOMBEIRO/bmrn.webp',
  bmro: 'img/BOMBEIRO/bmro.webp',
  bmrr: 'img/BOMBEIRO/bmrr.webp',
  bmrs: 'img/BOMBEIRO/bmrs.webp',
  bmsc: 'img/BOMBEIRO/bmsc.webp',
  bmse: 'img/BOMBEIRO/bmse.webp',
  bmsp: 'img/BOMBEIRO/bmsp.webp',
  bmto: 'img/BOMBEIRO/bmto.webp',
  pf: 'img/FEDERAL/pf.webp',
  prf: 'img/FEDERAL/prf.webp'
};

/* Brasões/insígnias em versão leve.
   Configuração estática extraída para js/data/header-brasoes-config.js.
   Os fallbacks abaixo preservam compatibilidade caso a página ainda não carregue o novo arquivo. */
const EXTENSOES_BRASAO_SUPORTADAS = window.EXTENSOES_BRASAO_SUPORTADAS || ['webp'];
const HEADER_INSTITUICOES_IMAGENS_ALIASES = window.HEADER_INSTITUICOES_IMAGENS_ALIASES || {};

function normalizarBaseImagemBrasao(base) {
  return String(base || '')
    .trim()
    .replace(/^\/+/, '')
    .replace(/^\.\//, '')
    .replace(/\.(webp|png|jpe?g|svg)$/i, '');
}

function montarCandidatosImagemInstituicao(inst, caminhoInicial) {
  const candidatos = [];
  const bases = [];
  const instLimpa = String(inst || '').trim();
  const instMinuscula = instLimpa.toLowerCase();
  const instMaiuscula = instLimpa.toUpperCase();
  const adicionarPastasOrganizadas = () => {
    ['MILITAR', 'CIVIL', 'PENAL', 'BOMBEIRO', 'FEDERAL', 'LOGO'].forEach(pasta => {
      adicionarBase(`img/${pasta}/${instMinuscula}`);
      adicionarBase(`img/${pasta}/${instMaiuscula}`);
    });
    if (instMinuscula === 'pcerj') adicionarBase('img/CIVIL/pcrj');
  };

  const adicionar = valor => {
    if (!valor) return;
    const caminho = String(valor).trim().replace(/^\/+/, '').replace(/^\.\//, '');
    if (caminho && !candidatos.includes(caminho)) candidatos.push(caminho);
  };

  const adicionarBase = base => {
    const baseLimpa = normalizarBaseImagemBrasao(base);
    if (baseLimpa && !bases.includes(baseLimpa)) bases.push(baseLimpa);
  };

  adicionar(caminhoInicial);
  adicionarBase(caminhoInicial || `img/${instMinuscula}`);
  adicionarBase(`img/${instMinuscula}`);
  adicionarBase(`img/${instMaiuscula}`);
  adicionarPastasOrganizadas();

  const aliases = HEADER_INSTITUICOES_IMAGENS_ALIASES[instMinuscula] || [];
  aliases.forEach(adicionarBase);

  bases.forEach(base => {
    EXTENSOES_BRASAO_SUPORTADAS.forEach(ext => adicionar(`${base}.${ext}`));
  });

  return candidatos;
}



function setCssUrlVariable(elemento, nomeVariavel, src, fallback = 'img/LOGO/logoleao.webp') {
  if (!elemento || !nomeVariavel) return;
  const imagemOriginal = String(src || fallback || 'img/LOGO/logoleao.webp');
  const imagem = imagemOriginal.replace(/["\\]/g, '\\$&');
  elemento.style.setProperty(nomeVariavel, `url("${imagem}")`);
  return imagemOriginal;
}

function setHeaderHeroImage(src) {
  const card = document.querySelector('.header-institution-card');
  if (!card) return;
  const imagemOriginal = setCssUrlVariable(card, '--header-hero-image', src);
  card.dataset.headerHeroImage = imagemOriginal;
}

function setSiteHeaderBackgroundImage(src) {
  const imagemOriginal = setCssUrlVariable(document.body, '--site-header-bg-image', src);
  if (imagemOriginal) document.body.dataset.siteHeaderBgImage = imagemOriginal;
}

function setPageInstitutionBackgroundImage(src) {
  const imagemOriginal = setCssUrlVariable(document.body, '--page-institution-image', src);
  if (imagemOriginal) document.body.dataset.pageInstitutionImage = imagemOriginal;
}

function configurarLogoInicialHeader(img) {
  if (!img) return;
  img.style.display = '';
  img.onerror = null;
  img.removeAttribute('srcset');
  img.removeAttribute('sizes');
  img.removeAttribute('data-fallback-aplicado');
  img.dataset.imgBase = 'img/LOGO/logoleao';
  img.dataset.retry = '';
  img.dataset.logoRetry = '0';
  img.alt = 'Logo Universo Segurança Pública';
  img.onerror = function () {
    const alternativas = ['img/LOGO/logoleao.webp', 'img/LOGO/logoleao.webp', 'img/LOGO/logoleao.webp', 'img/LOGO/logoleao.webp'];
    const indice = parseInt(this.dataset.logoRetry || '0', 10);
    if (indice < alternativas.length) {
      this.dataset.logoRetry = String(indice + 1);
      this.src = alternativas[indice];
      return;
    }
    this.onerror = null;
    this.style.display = 'none';
  };
  img.src = 'img/LOGO/logoleao.webp';
}

function aplicarImagemHeaderInstituicao(img, inst, dadosEstado, instituicao) {
  const card = document.querySelector('.header-institution-card');
  if (card) card.classList.remove('header-portal-home');

  const imagemInstituicao = HEADER_INSTITUICOES_IMAGENS[inst];
  const candidatosImagem = montarCandidatosImagemInstituicao(inst, imagemInstituicao);
  const fallbackBandeira = dadosEstado?.flag || HEADER_ESTADOS.sp.flag;
  const altInstituicao = instituicao?.desc || instituicao?.titulo || 'Instituição de segurança pública';

  // Cabeçalho do estado: volta a usar a bandeira como plano de fundo.
  setHeaderHeroImage(fallbackBandeira || 'img/LOGO/logoleao.webp');
  setSiteHeaderBackgroundImage(fallbackBandeira || 'img/LOGO/logoleao.webp');

  // Página grande: usa sempre o logo principal, independentemente da instituição selecionada.
  setPageInstitutionBackgroundImage('img/LOGO/logoleao.webp');

  if (!img) return;
  img.style.display = '';
  img.removeAttribute('data-retry');
  img.removeAttribute('data-img-base');
  img.removeAttribute('data-fallback-jpeg-aplicado');
  img.onerror = function () {
    const indice = parseInt(this.dataset.fallbackIndex || '0', 10);
    if (indice < candidatosImagem.length) {
      this.dataset.fallbackIndex = String(indice + 1);
      const proximaImagem = candidatosImagem[indice];
      if (proximaImagem && proximaImagem !== this.getAttribute('src')) {
        this.src = proximaImagem;
        return;
      }
    }

    if (this.dataset.fallbackAplicado === 'bandeira') {
      this.onerror = null;
      return;
    }

    this.dataset.fallbackAplicado = 'bandeira';
    this.src = fallbackBandeira;
    this.alt = `Bandeira de ${dadosEstado?.nome || 'estado'}`;
  };

  if (candidatosImagem.length) {
    img.dataset.fallbackAplicado = '';
    img.dataset.fallbackIndex = '1';
    img.src = candidatosImagem[0];
    img.alt = `Logo/brasão da ${altInstituicao}`;
  } else {
    img.dataset.fallbackAplicado = 'bandeira';
    img.dataset.fallbackIndex = '0';
    img.onerror = null;
    img.src = fallbackBandeira;
    img.alt = `Bandeira de ${dadosEstado?.nome || 'estado'}`;
  }
}


const HEADER_INSTITUICOES_RESUMO = {
  "pmesp": {
    "nome": "Polícia Militar do Estado de São Paulo",
    "sigla": "PMESP",
    "estado": "São Paulo",
    "estadoSigla": "SP",
    "tipo": "Polícia Militar",
    "criacao": "15/12/1831 · origem histórica",
    "ativa": 82000,
    "ativaLabel": "82.000+",
    "reserva": 72000,
    "reservaLabel": "72.000+ inativos",
    "femininas": 0,
    "femininasLabel": "93.802 cargos fixados em lei",
    "populacao": 46081801,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 562 hab. · 0,178%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Tarcísio de Freitas",
    "comando": "Cel PM Glauce Anselmo Cavalli — Comandante-Geral",
    "fonte": "PMESP; Governo de SP; SSP/SP Plano de Ação 2024; SGGD/SP; Leis SP 18.441/2026 e 18.442/2026; Portal da Transparência/SP",
    "atualizado": "PMESP revisada em 03/05/2026 — números exatos não inferidos quando a fonte oficial informa faixa"
  },
  "bmsp": {
    "nome": "Corpo de Bombeiros da Polícia Militar do Estado de São Paulo",
    "sigla": "CBPMESP",
    "siglaInterna": "BMSP",
    "estado": "São Paulo",
    "estadoSigla": "SP",
    "tipo": "Bombeiro Militar / órgão da PMESP",
    "criacao": "10/03/1880 · origem histórica",
    "ativa": 8604,
    "ativaLabel": "8.604 · ref. TCE/SP 2019/2020",
    "reserva": 0,
    "reservaLabel": "A confirmar · recorte CBPMESP",
    "femininas": 0,
    "femininasLabel": "A confirmar em fonte oficial",
    "populacao": 46081801,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 5.356 hab. · ref. histórica",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Tarcísio de Freitas",
    "comando": "Cel PM Alexandre Merlin — Comandante do Corpo de Bombeiros da PMESP",
    "estrutura": "CCB — Comando do Corpo de Bombeiros, vinculado à PMESP; atuação em prevenção e combate a incêndios, busca e salvamento, salvamento aquático, defesa civil, fiscalização técnica e educação pública.",
    "emergencia": "193",
    "fonte": "CBPMESP; PMESP; Governo de SP; ALESP; SGGD/SP; TCE/SP; DOE/SP; Vunesp",
    "atualizado": "CBPMESP/BMSP revisado em 03/05/2026 — chave interna bmsp preservada para compatibilidade"
  },
  "pcsp": {
    "nome": "Polícia Civil do Estado de São Paulo",
    "sigla": "PCSP",
    "estado": "São Paulo",
    "estadoSigla": "SP",
    "tipo": "Polícia Civil",
    "criacao": "Origem histórica: 1841 · confirmar fonte histórica oficial direta",
    "ativa": 21089,
    "ativaLabel": "21.089 · ref. 2022/2023",
    "reserva": 35000,
    "reservaLabel": "35.000 · estimado",
    "femininas": 5483,
    "femininasLabel": "5.483 · estimado",
    "populacao": 46081801,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 2.185 hab. · ref. histórica",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Tarcísio de Freitas",
    "comando": "Delegado Artur José Dian — Delegado-Geral da Polícia Civil",
    "estrutura": "DGP; DGPAD; DAP; DIPOL; DPPC; DECAP; DEMACRO; DEINTER 1 a 10; DEIC; DHPP; DENARC; DOPE; ACADEPOL; CORREGEDORIA",
    "sede": "Rua Brigadeiro Tobias, 527, São Paulo/SP, CEP 01032-902",
    "fonte": "PCSP; Governo/SSP-SP; SGGD/SP; Portal da Transparência/SP; ALESP; editais PCSP/Vunesp; Lei 18.440/2026, Lei 18.441/2026 e Lei 18.443/2026",
    "atualizado": "PCSP revisada em 03/05/2026 — efetivo ativo, inativos e feminino mantidos como estimativas/referência histórica a pedido"
  },
  "ppsp": {
    "nome": "Polícia Penal do Estado de São Paulo — PPESP/PPSP",
    "sigla": "PPSP",
    "estado": "São Paulo",
    "estadoSigla": "SP",
    "tipo": "Polícia Penal",
    "criacao": "EC 104/2019 · EC Estadual 51/2022 · LC SP 1.416/2024 · atividades desde fev/2025",
    "ativa": 25000,
    "ativaLabel": "25 mil+ · SAP/2025",
    "reserva": 35,
    "reservaLabel": "35+ · recorte AEVP/Transparência SP",
    "femininas": 2926,
    "femininasLabel": "2.926 · estimado",
    "populacao": 213401,
    "populacaoTitulo": "Pessoas custodiadas/atendidas",
    "relacaoLabel": "1 policial penal / 9 custodiados · estimado",
    "relacaoTitulo": "Relação efetivo/custódia",
    "governador": "Tarcísio de Freitas",
    "comando": "Rodrigo Santos Andrade — Diretor-Geral da Polícia Penal",
    "estrutura": "Diretoria Geral; Diretoria Geral Adjunta; Corregedoria da Polícia Penal; Coordenadoria de Inteligência; Coordenadoria Geral de Administração Integrada; Coordenadoria Geral de Execução Penal; Departamento de Segurança Penal; Departamento de Controle e Execução Penal; Coordenadoria de Reintegração Social e Cidadania; Coordenadoria de Saúde do Sistema Penitenciário; coordenadorias regionais",
    "sede": "Secretaria da Administração Penitenciária — São Paulo/SP",
    "fonte": "SAP/SP; ALESP; SGGD/SP; Governo de SP; Diário Oficial/SP; Instituto AOCP; Portal da Transparência/SP; SPPREV/IAMSPE",
    "atualizado": "PPSP revisada em 03/05/2026 — efetivo ativo SAP/2025; feminino estimado; inativos em recorte de transparência"
  },
  "pmerj": {
    "nome": "Polícia Militar do Estado do Rio de Janeiro",
    "sigla": "PMERJ",
    "estado": "Rio de Janeiro",
    "estadoSigla": "RJ",
    "tipo": "Polícia Militar",
    "criacao": "13/05/1809",
    "ativa": 43866,
    "ativaLabel": "43.866 vínculos ativos · GESPERJ fev/2026",
    "reserva": 26087,
    "reservaLabel": "26.087 inativos/aposentados · GESPERJ fev/2026",
    "femininas": 5703,
    "femininasLabel": "5.703 · estimativa (13% do efetivo ativo)",
    "efetivoTotalLabel": "60.445 cargos fixados em lei · Lei 11.041/2025",
    "populacao": 17223547,
    "populacaoTitulo": "População do Estado · IBGE 2025",
    "relacaoLabel": "1 ativo / 393 hab. · 0,255%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Ricardo Couto de Castro — Governador em exercício",
    "comando": "Cel PM Sylvio Ricardo Ciuffo Guerra — Secretário de Estado de Polícia Militar e Comandante-Geral da PMERJ",
    "estrutura": "SEPM/CG; Gabinete do Comando-Geral; Subsecretaria-Geral/Estado-Maior Geral; Subsecretarias de Gestão Administrativa, Gestão Operacional, Comando e Controle e Inteligência; Corregedoria-Geral; comandos intermediários; batalhões, companhias independentes e unidades especializadas.",
    "sede": "Quartel-General: Rua Evaristo da Veiga, 78, Centro, Rio de Janeiro/RJ — emergência 190.",
    "linksOficiais": [
      "https://sepm.rj.gov.br/",
      "https://sepm.rj.gov.br/comando/",
      "https://sepm.rj.gov.br/institucional/",
      "https://sepm.rj.gov.br/hierarquia/",
      "https://sepm.rj.gov.br/decreto-no-46-600-de-18-de-marco-de-2019/",
      "https://concursos.sepm.rj.gov.br",
      "https://www.rj.gov.br/gesperj",
      "https://www.transparencia.rj.gov.br/"
    ],
    "fonte": "PMERJ/SEPM; GESPERJ/RJ — Caderno de RH fevereiro/2026; GESPERJ/RJ — Caderno de Remuneração janeiro/2026; ALERJ — Lei 11.041/2025; IBGE — população estimada 2025; FGV/SEPM — concursos PMERJ.",
    "atualizado": "Referência: comando PMERJ 24/03/2026; concurso 06/04/2026; folha GESPERJ fev/2026; remuneração GESPERJ jan/2026; população IBGE 2025"
  },
  "pcerj": {
    "nome": "Polícia Civil do Rio de Janeiro",
    "sigla": "PCERJ",
    "estado": "Rio de Janeiro",
    "estadoSigla": "RJ",
    "tipo": "Polícia Civil",
    "criacao": "Origem histórica: 1808",
    "ativa": 6694,
    "ativaLabel": "6.694",
    "reserva": 10000,
    "reservaLabel": "10.000",
    "femininas": 1740,
    "femininasLabel": "1.740 · estimado",
    "populacao": 17223547,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 2.573 hab. · 0,039%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Ricardo Couto — Governador em exercício",
    "comando": "Delegado Delmir Gouveia — Secretário de Estado de Polícia Civil",
    "fonte": "IBGE 2025; FBSP/Anuário 2025; Pesquisa Perfil/SENASP; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pprj": {
    "nome": "Polícia Penal do Rio de Janeiro",
    "sigla": "PPRJ",
    "estado": "Rio de Janeiro",
    "estadoSigla": "RJ",
    "tipo": "Polícia Penal",
    "criacao": "EC 104/2019 · Polícia Penal estadual/distrital",
    "ativa": 2260,
    "ativaLabel": "2.260",
    "reserva": 0,
    "reservaLabel": "0 · carreira civil sem reserva militar; inativos dependem do RPPS local",
    "femininas": 359,
    "femininasLabel": "359",
    "populacao": 46354,
    "populacaoTitulo": "Presos atendidos",
    "relacaoLabel": "1 servidor / 21 presos",
    "relacaoTitulo": "Relação ativa/presos",
    "governador": "Ricardo Couto — Governador em exercício",
    "comando": "Secretaria de Estado de Polícia Penal do Rio de Janeiro — SEAP/SEPPEN",
    "fonte": "SISDEPEN/SENAPPEN 1º semestre/2025; IBGE 2025; FBSP/Anuário 2025; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pmmg": {
    "nome": "Polícia Militar de Minas Gerais",
    "sigla": "PMMG",
    "estado": "Minas Gerais",
    "estadoSigla": "MG",
    "tipo": "Polícia Militar",
    "criacao": "09/06/1775",
    "ativa": 36362,
    "ativaLabel": "36.362",
    "reserva": 45000,
    "reservaLabel": "45.000",
    "femininas": 4727,
    "femininasLabel": "4.727 · estimado",
    "populacao": 21393441,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 588 hab. · 0,170%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Mateus Simões",
    "comando": "Cel PM Carlos Frederico Otoni Garcia — Comandante-Geral",
    "fonte": "IBGE 2025; FBSP/Anuário 2025; Pesquisa Perfil/SENASP; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pcmg": {
    "nome": "Polícia Civil de Minas Gerais",
    "sigla": "PCMG",
    "estado": "Minas Gerais",
    "estadoSigla": "MG",
    "tipo": "Polícia Civil",
    "criacao": "Origem histórica: 1891",
    "ativa": 8957,
    "ativaLabel": "8.957",
    "reserva": 11000,
    "reservaLabel": "11.000",
    "femininas": 2329,
    "femininasLabel": "2.329 · estimado",
    "populacao": 21393441,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 2.388 hab. · 0,042%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Mateus Simões",
    "comando": "Delegada-Geral Letícia Baptista Gamboge Reis — Chefe da Polícia Civil",
    "fonte": "IBGE 2025; FBSP/Anuário 2025; Pesquisa Perfil/SENASP; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "ppmg": {
    "nome": "Polícia Penal de Minas Gerais",
    "sigla": "PPMG",
    "estado": "Minas Gerais",
    "estadoSigla": "MG",
    "tipo": "Polícia Penal",
    "criacao": "EC 104/2019 · Polícia Penal estadual/distrital",
    "ativa": 15045,
    "ativaLabel": "15.045",
    "reserva": 0,
    "reservaLabel": "0 · carreira civil sem reserva militar; inativos dependem do RPPS local",
    "femininas": 2337,
    "femininasLabel": "2.337",
    "populacao": 72149,
    "populacaoTitulo": "Presos atendidos",
    "relacaoLabel": "1 servidor / 5 presos",
    "relacaoTitulo": "Relação ativa/presos",
    "governador": "Mateus Simões",
    "comando": "Leonardo Mattos Alves Badaró — Diretor-Geral do Departamento Penitenciário/MG",
    "fonte": "SISDEPEN/SENAPPEN 1º semestre/2025; IBGE 2025; FBSP/Anuário 2025; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pmba": {
    "nome": "Polícia Militar da Bahia",
    "sigla": "PMBA",
    "estado": "Bahia",
    "estadoSigla": "BA",
    "tipo": "Polícia Militar",
    "criacao": "17/02/1825",
    "ativa": 29887,
    "ativaLabel": "29.887",
    "reserva": 27000,
    "reservaLabel": "27.000",
    "femininas": 3885,
    "femininasLabel": "3.885 · estimado",
    "populacao": 14870907,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 498 hab. · 0,201%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Jerônimo Rodrigues",
    "comando": "Cel PM Antônio Carlos Silva Magalhães — Comandante-Geral",
    "fonte": "IBGE 2025; FBSP/Anuário 2025; Pesquisa Perfil/SENASP; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pcba": {
    "nome": "Polícia Civil da Bahia",
    "sigla": "PCBA",
    "estado": "Bahia",
    "estadoSigla": "BA",
    "tipo": "Polícia Civil",
    "criacao": "Origem histórica: 1833",
    "ativa": 4370,
    "ativaLabel": "4.370",
    "reserva": 7000,
    "reservaLabel": "7.000",
    "femininas": 1136,
    "femininasLabel": "1.136 · estimado",
    "populacao": 14870907,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 3.403 hab. · 0,029%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Jerônimo Rodrigues",
    "comando": "Delegado André Viana — Delegado-Geral",
    "fonte": "IBGE 2025; FBSP/Anuário 2025; Pesquisa Perfil/SENASP; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "ppba": {
    "nome": "Polícia Penal da Bahia",
    "sigla": "PPBA",
    "estado": "Bahia",
    "estadoSigla": "BA",
    "tipo": "Polícia Penal",
    "criacao": "EC 104/2019 · Polícia Penal estadual/distrital",
    "ativa": 2706,
    "ativaLabel": "2.706",
    "reserva": 0,
    "reservaLabel": "0 · carreira civil sem reserva militar; inativos dependem do RPPS local",
    "femininas": 533,
    "femininasLabel": "533",
    "populacao": 15185,
    "populacaoTitulo": "Presos atendidos",
    "relacaoLabel": "1 servidor / 6 presos",
    "relacaoTitulo": "Relação ativa/presos",
    "governador": "Jerônimo Rodrigues",
    "comando": "José Castro — Secretário da SEAP/BA · Luiz Cláudio — Superintendência · Archimedes Neto — Segurança Prisional",
    "fonte": "SISDEPEN/SENAPPEN 1º semestre/2025; IBGE 2025; FBSP/Anuário 2025; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pmpr": {
    "nome": "Polícia Militar do Paraná",
    "sigla": "PMPR",
    "estado": "Paraná",
    "estadoSigla": "PR",
    "tipo": "Polícia Militar",
    "criacao": "10/08/1854",
    "ativa": 17036,
    "ativaLabel": "17.036",
    "reserva": 20000,
    "reservaLabel": "20.000",
    "femininas": 2215,
    "femininasLabel": "2.215 · estimado",
    "populacao": 11890517,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 698 hab. · 0,143%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Carlos Massa Ratinho Junior",
    "comando": "Cel PM Jefferson Silva — Comandante-Geral",
    "fonte": "IBGE 2025; FBSP/Anuário 2025; Pesquisa Perfil/SENASP; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pcpr": {
    "nome": "Polícia Civil do Paraná",
    "sigla": "PCPR",
    "estado": "Paraná",
    "estadoSigla": "PR",
    "tipo": "Polícia Civil",
    "criacao": "Origem histórica: 1853",
    "ativa": 3716,
    "ativaLabel": "3.716",
    "reserva": 6000,
    "reservaLabel": "6.000",
    "femininas": 966,
    "femininasLabel": "966 · estimado",
    "populacao": 11890517,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 3.200 hab. · 0,031%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Carlos Massa Ratinho Junior",
    "comando": "Delegado Silvio Jacob Rockembach — Delegado-Geral",
    "fonte": "IBGE 2025; FBSP/Anuário 2025; Pesquisa Perfil/SENASP; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pppr": {
    "nome": "Polícia Penal do Paraná",
    "sigla": "PPPR",
    "estado": "Paraná",
    "estadoSigla": "PR",
    "tipo": "Polícia Penal",
    "criacao": "EC 104/2019 · Polícia Penal estadual/distrital",
    "ativa": 4190,
    "ativaLabel": "4.190",
    "reserva": 0,
    "reservaLabel": "0 · carreira civil sem reserva militar; inativos dependem do RPPS local",
    "femininas": 670,
    "femininasLabel": "670",
    "populacao": 41743,
    "populacaoTitulo": "Presos atendidos",
    "relacaoLabel": "1 servidor / 10 presos",
    "relacaoTitulo": "Relação ativa/presos",
    "governador": "Carlos Massa Ratinho Junior",
    "comando": "Ananda Chalegre dos Santos — Diretora-Geral da Polícia Penal/PR",
    "fonte": "SISDEPEN/SENAPPEN 1º semestre/2025; IBGE 2025; FBSP/Anuário 2025; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pmrs": {
    "nome": "Brigada Militar do Rio Grande do Sul",
    "sigla": "PMRS",
    "estado": "Rio Grande do Sul",
    "estadoSigla": "RS",
    "tipo": "Polícia Militar",
    "criacao": "18/11/1837",
    "ativa": 17962,
    "ativaLabel": "17.962",
    "reserva": 23000,
    "reservaLabel": "23.000",
    "femininas": 3772,
    "femininasLabel": "3.772 · estimado",
    "populacao": 11233263,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 625 hab. · 0,160%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Eduardo Leite",
    "comando": "Cel PM Luigi Gustavo Soares Pereira — Comandante-Geral da Brigada Militar",
    "fonte": "IBGE 2025; FBSP/Anuário 2025; Pesquisa Perfil/SENASP; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pcrs": {
    "nome": "Polícia Civil do Rio Grande do Sul",
    "sigla": "PCRS",
    "estado": "Rio Grande do Sul",
    "estadoSigla": "RS",
    "tipo": "Polícia Civil",
    "criacao": "Origem histórica: 1841",
    "ativa": 5711,
    "ativaLabel": "5.711",
    "reserva": 7000,
    "reservaLabel": "7.000",
    "femininas": 1485,
    "femininasLabel": "1.485 · estimado",
    "populacao": 11233263,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 1.967 hab. · 0,051%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Eduardo Leite",
    "comando": "Delegado Heraldo Chaves Guerreiro — Chefe de Polícia",
    "fonte": "IBGE 2025; FBSP/Anuário 2025; Pesquisa Perfil/SENASP; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pprs": {
    "nome": "Polícia Penal do Rio Grande do Sul",
    "sigla": "PPRS",
    "estado": "Rio Grande do Sul",
    "estadoSigla": "RS",
    "tipo": "Polícia Penal",
    "criacao": "EC 104/2019 · Polícia Penal estadual/distrital",
    "ativa": 4881,
    "ativaLabel": "4.881",
    "reserva": 0,
    "reservaLabel": "0 · carreira civil sem reserva militar; inativos dependem do RPPS local",
    "femininas": 1509,
    "femininasLabel": "1.509",
    "populacao": 38519,
    "populacaoTitulo": "Presos atendidos",
    "relacaoLabel": "1 servidor / 8 presos",
    "relacaoTitulo": "Relação ativa/presos",
    "governador": "Eduardo Leite",
    "comando": "Sergio Dalcol — Superintendente da Polícia Penal/RS · Jorge Pozzobom — Secretário da SSPS",
    "fonte": "SISDEPEN/SENAPPEN 1º semestre/2025; IBGE 2025; FBSP/Anuário 2025; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pmsc": {
    "nome": "Polícia Militar de Santa Catarina",
    "sigla": "PMSC",
    "estado": "Santa Catarina",
    "estadoSigla": "SC",
    "tipo": "Polícia Militar",
    "criacao": "05/05/1835",
    "ativa": 9580,
    "ativaLabel": "9.580",
    "reserva": 12000,
    "reservaLabel": "12.000",
    "femininas": 1245,
    "femininasLabel": "1.245 · estimado",
    "populacao": 8187029,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 855 hab. · 0,117%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Jorginho Mello",
    "comando": "Cel PM Emerson Fernandes — Comandante-Geral",
    "fonte": "IBGE 2025; FBSP/Anuário 2025; Pesquisa Perfil/SENASP; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "bmsc": {
    "nome": "Corpo de Bombeiros Militar de Santa Catarina",
    "sigla": "CBMSC",
    "siglaInterna": "BMSC",
    "estado": "Santa Catarina",
    "estadoSigla": "SC",
    "tipo": "Bombeiro Militar",
    "criacao": "26/09/1926 · Seção de Bombeiros da Força Pública",
    "ativa": 5000,
    "ativaLabel": "5.000 profissionais (estimado/projeção centenário)",
    "reserva": 0,
    "reservaLabel": "Dados em breve",
    "femininas": 0,
    "femininasLabel": "Dados em breve",
    "efetivoTotalLabel": "5.000 profissionais projetados para 2026 · carreira, temporários e especialistas",
    "populacao": 8187029,
    "populacaoTitulo": "População do Estado · IBGE 2025",
    "relacaoLabel": "1 profissional / 1.637 hab. · 0,061% (estimado)",
    "relacaoTitulo": "Relação efetivo projetado/população",
    "governador": "Jorginho Mello",
    "comando": "Cel BM Fabiano de Souza — Comandante-Geral",
    "estrutura": "Comando-Geral, Subcomando-Geral, Estado-Maior, diretorias setoriais, Centro de Ensino, batalhões e cinco Regiões Bombeiro Militar, com atuação em prevenção, combate a incêndio, salvamento, atendimento pré-hospitalar, defesa civil e segurança contra incêndio.",
    "sede": "Centro Administrativo da SSP — Av. Gov. Ivo Silveira, 1521, Bloco A, Capoeiras, Florianópolis/SC, 88085-000",
    "emergencia": "193",
    "linksOficiais": [
      "https://www.cbm.sc.gov.br",
      "https://www.cbm.sc.gov.br/index.php/sobre-o-cbmsc/historia",
      "https://concurso.idib.org.br/",
      "https://leis.alesc.sc.gov.br/ato-normativo/22843",
      "https://www.transparencia.sc.gov.br/"
    ],
    "fonte": "CBMSC; ALESC/SC; IDIB; IBGE Estimativas 2025; Governo de SC; Portal da Transparência/SC",
    "atualizado": "CBMSC revisado em 09/05/2026 — efetivo ativo sem consolidação pública tratado como estimado/projeção; reserva e efetivo feminino em Dados em breve"
  },
  "pcsc": {
    "nome": "Polícia Civil de Santa Catarina",
    "sigla": "PCSC",
    "estado": "Santa Catarina",
    "estadoSigla": "SC",
    "tipo": "Polícia Civil",
    "criacao": "Origem histórica: 1812",
    "ativa": 3408,
    "ativaLabel": "3.408",
    "reserva": 4500,
    "reservaLabel": "4.500",
    "femininas": 886,
    "femininasLabel": "886 · estimado",
    "populacao": 8187029,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 2.402 hab. · 0,042%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Jorginho Mello",
    "comando": "Delegado Ulisses Gabriel — Delegado-Geral",
    "fonte": "IBGE 2025; FBSP/Anuário 2025; Pesquisa Perfil/SENASP; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "ppsc": {
    "nome": "Polícia Penal de Santa Catarina",
    "sigla": "PPSC",
    "estado": "Santa Catarina",
    "estadoSigla": "SC",
    "tipo": "Polícia Penal",
    "criacao": "EC 104/2019 · Polícia Penal estadual/distrital",
    "ativa": 3487,
    "ativaLabel": "3.487",
    "reserva": 0,
    "reservaLabel": "0 · carreira civil sem reserva militar; inativos dependem do RPPS local",
    "femininas": 754,
    "femininasLabel": "754",
    "populacao": 28975,
    "populacaoTitulo": "Presos atendidos",
    "relacaoLabel": "1 servidor / 8 presos",
    "relacaoTitulo": "Relação ativa/presos",
    "governador": "Jorginho Mello",
    "comando": "Maicon Ronald Alves — Diretor-Geral do Departamento de Polícia Penal/SC",
    "fonte": "SISDEPEN/SENAPPEN 1º semestre/2025; IBGE 2025; FBSP/Anuário 2025; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pmes": {
    "nome": "Polícia Militar do Espírito Santo",
    "sigla": "PMES",
    "estado": "Espírito Santo",
    "estadoSigla": "ES",
    "tipo": "Polícia Militar",
    "criacao": "06/04/1835",
    "ativa": 7890,
    "ativaLabel": "7.890",
    "reserva": 7000,
    "reservaLabel": "7.000",
    "femininas": 1026,
    "femininasLabel": "1.026 · estimado",
    "populacao": 4126854,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 523 hab. · 0,191%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Ricardo Ferraço",
    "comando": "Cel PM Ríodo Lopes Rubim — Comandante-Geral",
    "fonte": "IBGE 2025; FBSP/Anuário 2025; Pesquisa Perfil/SENASP; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "bmes": {
    "nome": "Corpo de Bombeiros Militar do Estado do Espírito Santo",
    "sigla": "CBMES",
    "siglaInterna": "BMES",
    "estado": "Espírito Santo",
    "estadoSigla": "ES",
    "tipo": "Bombeiro Militar",
    "criacao": "26/12/1912 · Lei ES nº 874",
    "ativa": 1955,
    "ativaLabel": "1.955 cargos legais (estimado)",
    "reserva": 0,
    "reservaLabel": "Dados em breve",
    "femininas": 0,
    "femininasLabel": "Dados em breve",
    "efetivoTotalLabel": "1.955 cargos legais/projetados (estimado); quadro anterior citado em 1.822",
    "populacao": 4126854,
    "populacaoTitulo": "População do Estado · IBGE 2025",
    "relacaoLabel": "1 cargo legal / 2.111 hab. · 0,047% (estimado)",
    "relacaoTitulo": "Relação quadro legal/população",
    "governador": "Renato Casagrande",
    "comando": "Cel BM Alexandre dos Santos Cerqueira — Comandante-Geral",
    "estrutura": "Comando-Geral, Subcomando-Geral, Estado-Maior, Centro de Atividades Técnicas, Centro de Ensino e Instrução de Bombeiros, batalhões e companhias operacionais, com atuação em defesa civil, prevenção e combate a incêndios, perícia de incêndio e explosões, busca e salvamento, atendimento emergencial e segurança contra incêndio e pânico.",
    "sede": "Rua Tenente Mário Francisco Brito, 100, Enseada do Suá, Vitória/ES, CEP 29050-555",
    "emergencia": "193",
    "linksOficiais": [
      "https://cb.es.gov.br/",
      "https://cb.es.gov.br/historia",
      "https://cb.es.gov.br/comandante-geral",
      "https://cb.es.gov.br/cfo2023",
      "https://cb.es.gov.br/organograma",
      "https://transparencia.es.gov.br/"
    ],
    "fonte": "CBMES; Governo do Espírito Santo; PMES/legislação; ALEES; IBGE; CFO 2026/IDECAN; tabela PM/CBM ES 01/12/2025; Lei ES 11.985/2023; Lei ES 12.783/2026; Portal da Transparência/ES",
    "atualizado": "CBMES revisado em 09/05/2026 — efetivo ativo real não inferido; quadro legal tratado como estimado quando não consolidado em fonte oficial direta"
  },
  "pces": {
    "nome": "Polícia Civil do Espírito Santo",
    "sigla": "PCES",
    "estado": "Espírito Santo",
    "estadoSigla": "ES",
    "tipo": "Polícia Civil",
    "criacao": "Origem histórica: 1896",
    "ativa": 1867,
    "ativaLabel": "1.867",
    "reserva": 3500,
    "reservaLabel": "3.500",
    "femininas": 485,
    "femininasLabel": "485 · estimado",
    "populacao": 4126854,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 2.210 hab. · 0,045%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Ricardo Ferraço",
    "comando": "Delegado-Geral Jordano Bruno — Delegado-Geral",
    "fonte": "IBGE 2025; FBSP/Anuário 2025; Pesquisa Perfil/SENASP; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "ppes": {
    "nome": "Polícia Penal do Espírito Santo",
    "sigla": "PPES",
    "estado": "Espírito Santo",
    "estadoSigla": "ES",
    "tipo": "Polícia Penal",
    "criacao": "EC 104/2019 · Polícia Penal estadual/distrital",
    "ativa": 2836,
    "ativaLabel": "2.836",
    "reserva": 0,
    "reservaLabel": "0 · carreira civil sem reserva militar; inativos dependem do RPPS local",
    "femininas": 678,
    "femininasLabel": "678",
    "populacao": 25021,
    "populacaoTitulo": "Presos atendidos",
    "relacaoLabel": "1 servidor / 9 presos",
    "relacaoTitulo": "Relação ativa/presos",
    "governador": "Ricardo Ferraço",
    "comando": "José Franco Morais Junior — Diretor-Geral da Polícia Penal/ES",
    "fonte": "SISDEPEN/SENAPPEN 1º semestre/2025; IBGE 2025; FBSP/Anuário 2025; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pmms": {
    "nome": "Polícia Militar de Mato Grosso do Sul",
    "sigla": "PMMS",
    "estado": "Mato Grosso do Sul",
    "estadoSigla": "MS",
    "tipo": "Polícia Militar",
    "criacao": "05/09/1835 · estrutura de MS em 1979",
    "ativa": 5237,
    "ativaLabel": "5.237",
    "reserva": 5499,
    "reservaLabel": "5.499 · estimativa técnica",
    "femininas": 681,
    "femininasLabel": "681 · estimado",
    "populacao": 2924631,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 558 hab. · 0,179%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Eduardo Riedel",
    "comando": "Cel QOPM Renato dos Anjos Garnes — Comandante-Geral",
    "fonte": "IBGE 2025; FBSP/Anuário 2025; Pesquisa Perfil/SENASP; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pcms": {
    "nome": "Polícia Civil de Mato Grosso do Sul",
    "sigla": "PCMS",
    "estado": "Mato Grosso do Sul",
    "estadoSigla": "MS",
    "tipo": "Polícia Civil",
    "criacao": "Abril/1979 · LC MS 114/2005",
    "ativa": 1971,
    "ativaLabel": "1.971",
    "reserva": 2168,
    "reservaLabel": "2.168 · estimativa técnica",
    "femininas": 512,
    "femininasLabel": "512 · estimado",
    "populacao": 2924631,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 1.484 hab. · 0,067%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Eduardo Riedel",
    "comando": "Delegado Lupérsio Degerone Lúcio — Delegado-Geral",
    "fonte": "IBGE 2025; FBSP/Anuário 2025; Pesquisa Perfil/SENASP; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "ppms": {
    "nome": "Polícia Penal de Mato Grosso do Sul",
    "sigla": "PPMS",
    "estado": "Mato Grosso do Sul",
    "estadoSigla": "MS",
    "tipo": "Polícia Penal",
    "criacao": "EC 104/2019 · Polícia Penal estadual/distrital",
    "ativa": 1232,
    "ativaLabel": "1.232",
    "reserva": 0,
    "reservaLabel": "0 · carreira civil sem reserva militar; inativos dependem do RPPS local",
    "femininas": 428,
    "femininasLabel": "428",
    "populacao": 17478,
    "populacaoTitulo": "Presos atendidos",
    "relacaoLabel": "1 servidor / 14 presos",
    "relacaoTitulo": "Relação ativa/presos",
    "governador": "Eduardo Riedel",
    "comando": "Direção da Polícia Penal de Mato Grosso do Sul — AGEPEN/MS",
    "fonte": "SISDEPEN/SENAPPEN 1º semestre/2025; IBGE 2025; FBSP/Anuário 2025; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pmmt": {
    "nome": "Polícia Militar de Mato Grosso",
    "sigla": "PMMT",
    "estado": "Mato Grosso",
    "estadoSigla": "MT",
    "tipo": "Polícia Militar",
    "criacao": "05/09/1835",
    "ativa": 6752,
    "ativaLabel": "6.752",
    "reserva": 7090,
    "reservaLabel": "7.090 · estimativa técnica",
    "femininas": 608,
    "femininasLabel": "608 · estimado",
    "populacao": 3893659,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 577 hab. · 0,173%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Otaviano Pivetta",
    "comando": "Cel PM Claudio Fernando Carneiro Tinoco — Comandante-Geral",
    "fonte": "IBGE 2025; FBSP/Anuário 2025; Pesquisa Perfil/SENASP; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "bmmt": {
    "nome": "Corpo de Bombeiros Militar do Estado de Mato Grosso",
    "sigla": "CBMMT",
    "siglaInterna": "BMMT",
    "estado": "Mato Grosso",
    "estadoSigla": "MT",
    "tipo": "Bombeiro Militar",
    "criacao": "19/08/1964 · Lei MT nº 2.184; autonomia em 28/10/1994",
    "ativa": 1800,
    "ativaLabel": "1.800+ ativos (estimado)",
    "reserva": 0,
    "reservaLabel": "Dados em breve",
    "femininas": 0,
    "femininasLabel": "Dados em breve",
    "efetivoTotalLabel": "Efetivo ativo real: Dados em breve; presença operacional registrada em 31 unidades/UBMs e cobertura aproximada de 70% a 80% da população",
    "populacao": 3893659,
    "populacaoTitulo": "População do Estado · IBGE 2025",
    "relacaoLabel": "1 ativo estimado / 2.163 hab. · 0,046% (estimado)",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Otaviano Pivetta",
    "comando": "Cel BM Flávio Glêdson Vieira Bezerra — Comandante-Geral",
    "estrutura": "Comando-Geral, Comando-Geral Adjunto, Corregedoria-Geral, Estado-Maior, diretorias setoriais, Comandos Regionais Bombeiro Militar, batalhões, companhias independentes, pelotões independentes, núcleos bombeiro militar, unidades bombeiro militar e Grupamento de Aviação Bombeiro Militar, conforme LC MT nº 775/2023 e informações institucionais do CBMMT.",
    "sede": "Quartel do Comando-Geral — Avenida Historiador Rubens de Mendonça, Cuiabá/MT",
    "emergencia": "193",
    "linksOficiais": [
      "https://www.bombeiros.mt.gov.br/",
      "https://www.bombeiros.mt.gov.br/legislacao",
      "https://www.bombeiros.mt.gov.br/concursos-e-seletivos",
      "https://www.transparencia.mt.gov.br/",
      "https://www.iomat.mt.gov.br/"
    ],
    "fonte": "CBMMT; Governo de Mato Grosso; LC MT 541/2014; LC MT 775/2023; Lei MT 13.220/2026; Edital SEPLAG/SESP/CBMMT nº 007/2022; IBGE; IOMAT; Portal da Transparência/MT",
    "atualizado": "CBMMT revisado em 09/05/2026 — efetivo ativo real não inferido; estimativas marcadas explicitamente"
  },
  "pcmt": {
    "nome": "Polícia Judiciária Civil de Mato Grosso",
    "sigla": "PCMT",
    "estado": "Mato Grosso",
    "estadoSigla": "MT",
    "tipo": "Polícia Civil",
    "criacao": "Lei MT 7.935/2003 · LC MT 407/2010",
    "ativa": 2887,
    "ativaLabel": "2.887",
    "reserva": 3176,
    "reservaLabel": "3.176 · estimativa técnica",
    "femininas": 751,
    "femininasLabel": "751 · estimado",
    "populacao": 3893659,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 1.349 hab. · 0,074%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Otaviano Pivetta",
    "comando": "Delegada Daniela Silveira Maidel — Delegada-Geral",
    "fonte": "IBGE 2025; FBSP/Anuário 2025; Pesquisa Perfil/SENASP; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "ppmt": {
    "nome": "Polícia Penal de Mato Grosso",
    "sigla": "PPMT",
    "estado": "Mato Grosso",
    "estadoSigla": "MT",
    "tipo": "Polícia Penal",
    "criacao": "EC 104/2019 · Polícia Penal estadual/distrital",
    "ativa": 2096,
    "ativaLabel": "2.096",
    "reserva": 0,
    "reservaLabel": "0 · carreira civil sem reserva militar; inativos dependem do RPPS local",
    "femininas": 623,
    "femininasLabel": "623",
    "populacao": 14770,
    "populacaoTitulo": "Presos atendidos",
    "relacaoLabel": "1 servidor / 7 presos",
    "relacaoTitulo": "Relação ativa/presos",
    "governador": "Otaviano Pivetta",
    "comando": "Direção da Polícia Penal de Mato Grosso — SEJUS/MT",
    "fonte": "SISDEPEN/SENAPPEN 1º semestre/2025; IBGE 2025; FBSP/Anuário 2025; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pmac": {
    "nome": "Polícia Militar do Acre",
    "sigla": "PMAC",
    "estado": "Acre",
    "estadoSigla": "AC",
    "tipo": "Polícia Militar",
    "criacao": "1916",
    "ativa": 2540,
    "ativaLabel": "2.540",
    "reserva": 2667,
    "reservaLabel": "2.667 · estimativa técnica",
    "femininas": 330,
    "femininasLabel": "330 · estimado",
    "populacao": 884372,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 348 hab. · 0,287%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Mailza Assis Cameli",
    "comando": "Cel PM Marta Renata da Silva Freitas Alves — Comandante-Geral",
    "fonte": "IBGE 2025; FBSP/Anuário 2025; Pesquisa Perfil/SENASP; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pcac": {
    "nome": "Polícia Civil do Acre",
    "sigla": "PCAC",
    "estado": "Acre",
    "estadoSigla": "AC",
    "tipo": "Polícia Civil",
    "criacao": "Órgão estadual de polícia judiciária · origem republicana",
    "ativa": 893,
    "ativaLabel": "893",
    "reserva": 982,
    "reservaLabel": "982 · estimativa técnica",
    "femininas": 232,
    "femininasLabel": "232 · estimado",
    "populacao": 884372,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 990 hab. · 0,101%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Mailza Assis Cameli",
    "comando": "Pedro Paulo Buzolin — Delegado-Geral da Polícia Civil do Acre",
    "fonte": "IBGE 2025; FBSP/Anuário 2025; Pesquisa Perfil/SENASP; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "ppac": {
    "nome": "Polícia Penal do Acre",
    "sigla": "PPAC",
    "estado": "Acre",
    "estadoSigla": "AC",
    "tipo": "Polícia Penal",
    "criacao": "EC 104/2019 · Polícia Penal estadual/distrital",
    "ativa": 651,
    "ativaLabel": "651",
    "reserva": 0,
    "reservaLabel": "0 · carreira civil sem reserva militar; inativos dependem do RPPS local",
    "femininas": 114,
    "femininasLabel": "114",
    "populacao": 5528,
    "populacaoTitulo": "Presos atendidos",
    "relacaoLabel": "1 servidor / 8 presos",
    "relacaoTitulo": "Relação ativa/presos",
    "governador": "Mailza Assis Cameli",
    "comando": "Direção da Polícia Penal do Acre — IAPEN/AC",
    "fonte": "SISDEPEN/SENAPPEN 1º semestre/2025; IBGE 2025; FBSP/Anuário 2025; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pmal": {
    "nome": "Polícia Militar do Estado de Alagoas",
    "sigla": "PMAL",
    "estado": "Alagoas",
    "estadoSigla": "AL",
    "tipo": "Polícia Militar",
    "criacao": "03/02/1832 · Decisão Imperial nº 52 e corpo policial provincial",
    "ativa": 7493,
    "ativaLabel": "7.493 ativos · Governo de Alagoas/PMAL 2026",
    "reserva": 7308,
    "reservaLabel": "7.308 inativos/reserva · estimado",
    "femininas": 905,
    "femininasLabel": "905 mulheres · estimado",
    "populacao": 3220848,
    "populacaoTitulo": "População do Estado",
    "populacaoLabel": "3.220.848 habitantes",
    "relacaoLabel": "1 ativo / 430 hab. · 0,233%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Paulo Dantas",
    "comando": "Cel QOC PM Paulo Amorim Feitosa Filho — Comandante-Geral",
    "estrutura": "Sete grandes comandos de região, batalhões, companhias, unidades administrativas, de ensino, diretorias, seções e setores, com policiamento ostensivo e preservação da ordem pública nos 102 municípios alagoanos.",
    "sede": "Avenida Assis Chateaubriand, s/n, Trapiche da Barra, Maceió/AL, CEP 57020-410",
    "emergencia": "190",
    "linksOficiais": [
      "https://www.pm.al.gov.br/",
      "https://www.cebraspe.org.br/concursos/pm_al_26",
      "https://central.pm.al.gov.br/sistemas/public/sislegis/publico/index/param/2",
      "https://transparencia.al.gov.br/pessoal/servidores-ativos/?codigo_orgao=12442570000110"
    ],
    "fonte": "PMAL; Governo de Alagoas; Cebraspe PM_AL_26; SAPL/ALEAL; Portal da Transparência/AL; Lei AL 7.580/2014; Lei AL 8.671/2022; Lei AL 9.852/2026; IBGE 2025",
    "atualizado": "PMAL revisada em 09/05/2026 — efetivo ativo oficial; reserva, feminino e postos sem tabela consolidada de 2026 marcados como estimados"
  },
  "pcal": {
    "nome": "Polícia Civil de Alagoas",
    "sigla": "PCAL",
    "estado": "Alagoas",
    "estadoSigla": "AL",
    "tipo": "Polícia Civil",
    "criacao": "Polícia Civil estadual · origem histórica republicana",
    "ativa": 1810,
    "ativaLabel": "1.810",
    "reserva": 1991,
    "reservaLabel": "1.991 · estimativa técnica",
    "femininas": 471,
    "femininasLabel": "471 · estimado",
    "populacao": 3220848,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 1.779 hab. · 0,056%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Paulo Dantas",
    "comando": "Delegado Gustavo Xavier — Delegado-Geral da Polícia Civil de Alagoas",
    "fonte": "IBGE 2025; FBSP/Anuário 2025; Pesquisa Perfil/SENASP; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "ppal": {
    "nome": "Polícia Penal do Estado de Alagoas",
    "sigla": "PPAL",
    "estado": "Alagoas",
    "estadoSigla": "AL",
    "tipo": "Polícia Penal",
    "criacao": "EC 104/2019 · Lei AL 8.650/2022 · Lei AL 7.993/2018",
    "ativa": 508,
    "ativaLabel": "508 policiais penais · estimado",
    "reserva": 0,
    "reservaLabel": "Inativos: conferir AL Previdência/RPPS-AL",
    "femininas": 153,
    "femininasLabel": "153 mulheres · estimado",
    "populacao": 6386,
    "populacaoTitulo": "Presos recolhidos",
    "relacaoLabel": "1 policial penal / 13 presos · estimado",
    "relacaoTitulo": "Relação ativa/presos",
    "governador": "Paulo Dantas",
    "comando": "Diogo Zeferino do Carmo Teixeira — Secretário de Estado da Ressocialização e Inclusão Social; Carlos Henrique Toledo Voss — Secretário Executivo de Gestão Penitenciária",
    "fonte": "SERIS/AL; Alagoas Digital; SAPL/ALEAL; Lei AL 7.993/2018; Lei AL 8.650/2022; Lei AL 9.849/2026; Cebraspe/SERIS 2021; Mapa de População Carcerária SERIS abr/2026",
    "atualizado": "PPAL revisada em 09/05/2026 — efetivo ativo e feminino mantidos como estimativa quando não localizados em fonte oficial consolidada",
    "estrutura": "SERIS/AL com gabinete, corregedoria, ouvidoria, gestão interna, Chefia Especial de Gestão Penitenciária, Comando de Operações Penitenciárias, GERT, monitoramento eletrônico, Escola Penitenciária, saúde, educação, produção, laborterapia, inteligência e chefias de unidades prisionais.",
    "sede": "Rua 10 de Novembro, 256, Farol, Maceió/AL, CEP 57050-220",
    "emergencia": "Administração prisional: (82) 3315-1744 · Emergências gerais: 190",
    "linksOficiais": [
      "https://www.seris.al.gov.br/",
      "https://www.seris.al.gov.br/institucional",
      "https://www.seris.al.gov.br/institucional/quem-e-quem",
      "https://www.seris.al.gov.br/populacao-carceraria",
      "https://sapl.al.al.leg.br/norma/3810"
    ]
  },
  "pmam": {
    "nome": "Polícia Militar do Estado do Amazonas",
    "sigla": "PMAM",
    "estado": "Amazonas",
    "estadoSigla": "AM",
    "tipo": "Polícia Militar",
    "criacao": "04/04/1837 · Guarda Policial da Província do Amazonas",
    "ativa": 8250,
    "ativaLabel": "8.250 (estimado)",
    "reserva": 8662,
    "reservaLabel": "8.662 inativos/reserva (estimado)",
    "femininas": 1072,
    "femininasLabel": "1.072 mulheres (estimado)",
    "populacao": 4321616,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 524 hab. · 0,191% (estimado)",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Roberto Cidade",
    "comando": "Cel PM Klinger Paiva — Comandante-Geral",
    "fonte": "PMAM; Governo do Amazonas; FGV/PMAM 2021; Lei AM nº 3.725/2012; Lei AM nº 7.445/2025; IBGE 2025; FBSP/SENASP quando aplicável",
    "atualizado": "PMAM revisada em 09/05/2026 — efetivo ativo, reserva/inativos e efetivo feminino mantidos como estimativa quando não localizados em fonte oficial consolidada",
    "estrutura": "Polícia Militar estadual subordinada ao Governador do Amazonas, com Comando-Geral, Estado-Maior, diretorias, comandos de policiamento, unidades operacionais, unidades especializadas, ensino e apoio administrativo.",
    "sede": "Rua Benjamin Constant, 2150, Petrópolis, Manaus/AM, CEP 69063-010",
    "emergencia": "190",
    "linksOficiais": [
      "https://www.pm.am.gov.br/",
      "https://www.pm.am.gov.br/historia/",
      "https://www.pm.am.gov.br/editais/",
      "https://conhecimento.fgv.br/concursos/pmam21",
      "https://sapl.al.am.leg.br/media/sapl/public/normajuridica/2025/13902/7445.pdf"
    ]
  },
  "pcam": {
    "nome": "Polícia Civil do Estado do Amazonas",
    "sigla": "PCAM",
    "estado": "Amazonas",
    "estadoSigla": "AM",
    "tipo": "Polícia Civil",
    "criacao": "1922 · criação da Polícia Judiciária de carreira no Amazonas; estrutura orgânica regulamentada pelo Decreto AM nº 2.291/1972",
    "ativa": 2160,
    "ativaLabel": "2.000+ policiais e 160+ administrativos",
    "reserva": 0,
    "reservaLabel": "Inativos/RPPS: Dados em breve",
    "femininas": 0,
    "femininasLabel": "Efetivo feminino: Dados em breve",
    "populacao": 4321616,
    "populacaoLabel": "4.321.616 habitantes · IBGE 2025",
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 2.001 hab. · 0,050% (estimado)",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Roberto Cidade",
    "comando": "Delegado Bruno de Paula Fraga — Delegado-Geral",
    "estrutura": "Delegacia-Geral, Delegacia-Geral Adjunta, Departamento de Polícia Metropolitana, Departamento de Polícia do Interior, Departamento de Repressão ao Crime Organizado, Departamento de Investigação sobre Narcóticos, Coordenadoria de Operações e Recursos Especiais, 30 Distritos Integrados de Polícia na capital, 19 delegacias especializadas, 6 seccionais, 61 Delegacias Interativas no interior, 10 especializadas no interior e 2 Postos de Policiamento Integrados.",
    "sede": "Delegacia-Geral da Polícia Civil — Av. Pedro Teixeira, nº 180, bairro Dom Pedro, Manaus/AM",
    "emergencia": "181 Disk-Denúncia · 190 Polícia/CIOPS",
    "linksOficiais": [
      "https://www.policiacivil.am.gov.br/",
      "https://museu.policiacivil.am.gov.br/?page_id=431",
      "https://www.amazonas.am.gov.br/orgaos_entidades/policia-civil-do-estado-do-amazonas-pc/",
      "https://conhecimento.fgv.br/concursos/pcam21",
      "https://sapl.al.am.leg.br/norma/13903"
    ],
    "fonte": "PCAM; Museu da Polícia Civil do Amazonas; Governo do Amazonas; SSP/AM; Lei AM nº 2.875/2004; Lei AM nº 4.576/2018; Lei AM nº 7.446/2025; FGV PCAM 2021/2022; IBGE 2025",
    "atualizado": "PCAM revisada em 10/05/2026 — efetivo ativo exibido conforme página histórica oficial; inativos e efetivo feminino sem número oficial consolidado; remuneração pela Lei AM nº 7.446/2025 com efeitos em 01/12/2025"
  },
  "ppam": {
    "nome": "Polícia Penal do Amazonas",
    "sigla": "PPAM",
    "estado": "Amazonas",
    "estadoSigla": "AM",
    "tipo": "Polícia Penal",
    "criacao": "EC 104/2019 · Polícia Penal estadual/distrital",
    "ativa": 1125,
    "ativaLabel": "1.125",
    "reserva": 0,
    "reservaLabel": "0 · carreira civil sem reserva militar; inativos dependem do RPPS local",
    "femininas": 159,
    "femininasLabel": "159",
    "populacao": 5657,
    "populacaoTitulo": "Presos atendidos",
    "relacaoLabel": "1 servidor / 5 presos",
    "relacaoTitulo": "Relação ativa/presos",
    "governador": "Roberto Cidade — Governador em exercício",
    "comando": "Diretor/Secretário da PPAM — nome a confirmar em fonte oficial",
    "fonte": "SISDEPEN/SENAPPEN 1º semestre/2025; IBGE 2025; FBSP/Anuário 2025; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pmap": {
    "nome": "Polícia Militar do Estado do Amapá",
    "sigla": "PMAP",
    "estado": "Amapá",
    "estadoSigla": "AP",
    "tipo": "Polícia Militar",
    "criacao": "26/11/1975 · Lei Federal nº 6.270/1975 · origem territorial; antecedente: Guarda Territorial do Amapá",
    "ativa": 3109,
    "ativaLabel": "3.109 ativos (estimado)",
    "reserva": 3264,
    "reservaLabel": "3.264 reserva/reforma/pensionistas (estimado)",
    "total": 6373,
    "totalLabel": "≈ 6.373 vínculos ativos/inativos (estimado)",
    "femininas": 871,
    "femininasLabel": "871 mulheres (estimado)",
    "populacao": 806517,
    "populacaoLabel": "806.517 habitantes · IBGE 2025",
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 259 hab. · 0,385% (estimado)",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Clécio Luís",
    "comando": "Cel PM Márcio Allan — Comandante-Geral",
    "estrutura": "Comando-Geral, Subcomando-Geral, Estado-Maior, diretorias, batalhões territoriais, unidades especializadas, policiamento ostensivo, ambiental, trânsito, BOPE, radiopatrulhamento, saúde, ensino, logística e corregedoria; atuação em Macapá, Santana e interior do Amapá conforme organização operacional da corporação.",
    "sede": "Quartel do Comando-Geral — Rua Jovino Dinoá, 3671, bairro Beirol, Macapá/AP — CEP 68.902-030",
    "emergencia": "190",
    "linksOficiais": [
      "https://pm.ap.gov.br/",
      "https://pm.portal.ap.gov.br/conteudo/institucional/historia-da-pm",
      "https://pm.portal.ap.gov.br/conteudo/institucional/comandante-geral",
      "https://sead.portal.ap.gov.br/concursos/vigentes/24027",
      "https://sead.portal.ap.gov.br/legislacoes"
    ],
    "fonte": "PMAP; Governo do Amapá; SEAD/AP; Diário Oficial do Amapá; LC AP 113/2018 e LC AP 173/2025; IBGE 2025; Portal da Transparência/AP; FCC/SEAD/AP concurso Soldado PM 2022/2026",
    "atualizado": "PMAP revisada em 10/05/2026 — comando atualizado por pauta oficial de passagem de comando; efetivo, reserva e mulheres marcados como estimados; remuneração por subsídio da LC AP nº 173/2025, Anexo III, com efeitos em 01/04/2026"
  },
  "pcap": {
    "nome": "Polícia Civil do Estado do Amapá",
    "sigla": "PCAP",
    "estado": "Amapá",
    "estadoSigla": "AP",
    "tipo": "Polícia Civil",
    "criacao": "14/12/2001 · Lei AP nº 637 · estrutura organizacional básica",
    "ativa": 1010,
    "ativaLabel": "1.010 · estimado",
    "reserva": 1111,
    "reservaLabel": "1.111 inativos · estimado",
    "femininas": 263,
    "femininasLabel": "263 mulheres · estimado",
    "populacao": 806517,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 799 hab. · 0,125% · estimado",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Clécio Luís",
    "comando": "Delegado Victor Crispim Vinagre — Delegado-Geral de Polícia Civil",
    "siglaInterna": "PCAP",
    "efetivoTotalLabel": "Efetivo ativo/inativo em revisão · usar valores estimados até publicação oficial consolidada",
    "estrutura": "Delegacia-Geral de Polícia Civil, Conselho Superior, Corregedoria-Geral, Departamento de Polícia da Capital, Departamento de Polícia do Interior, Departamento de Polícia Especializada, delegacias distritais, especializadas, CIOSPs, unidades administrativas e apoio técnico-operacional.",
    "sede": "Av. FAB, nº 84, bairro Central, CEP 68.900-073, Macapá/AP",
    "emergencia": "197 · Polícia Civil / 181 · Disque-Denúncia / 190 · emergência integrada",
    "linksOficiais": [
      "https://policiacivil.portal.ap.gov.br/",
      "https://policiacivil.ap.gov.br/conteudo/institucional/historico",
      "https://policiacivil.ap.gov.br/conteudo/institucional/delegacia-geral",
      "https://sead.portal.ap.gov.br/concursos/vigentes/3736",
      "https://editor.amapa.gov.br/arquivos_portais/publicacoes/SEAD_0a28adc21c77ae9d1d3acefd6ae760af.pdf"
    ],
    "fonte": "PCAP; Governo do Amapá; SEAD/AP; Diário Oficial do Amapá; Lei AP nº 637/2001; Lei AP nº 883/2005; Lei AP nº 3.037/2024; tabela de subsídios SEAD/AP 2025; IBGE 2025; FBSP/SENASP para efetivo estimado",
    "atualizado": "PCAP revisada em 10/05/2026 — comando atualizado por Diário Oficial/Conselho Superior; efetivo, reserva e mulheres marcados como estimados; remuneração por subsídio com vigência de 01/04/2024"
  },
  "ppap": {
    "nome": "Polícia Penal do Amapá",
    "sigla": "PPAP",
    "estado": "Amapá",
    "estadoSigla": "AP",
    "tipo": "Polícia Penal",
    "criacao": "EC 104/2019 · Polícia Penal estadual/distrital",
    "ativa": 767,
    "ativaLabel": "767",
    "reserva": 0,
    "reservaLabel": "0 · carreira civil sem reserva militar; inativos dependem do RPPS local",
    "femininas": 216,
    "femininasLabel": "216",
    "populacao": 3781,
    "populacaoTitulo": "Presos atendidos",
    "relacaoLabel": "1 servidor / 5 presos",
    "relacaoTitulo": "Relação ativa/presos",
    "governador": "Clécio Luís",
    "comando": "Diretor/Secretário da PPAP — nome a confirmar em fonte oficial",
    "fonte": "SISDEPEN/SENAPPEN 1º semestre/2025; IBGE 2025; FBSP/Anuário 2025; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pmce": {
    "nome": "Polícia Militar do Ceará",
    "sigla": "PMCE",
    "estado": "Ceará",
    "estadoSigla": "CE",
    "tipo": "Polícia Militar",
    "criacao": "24/05/1835",
    "ativa": 22427,
    "ativaLabel": "22.427",
    "reserva": 23548,
    "reservaLabel": "23.548 · estimativa técnica",
    "femininas": 1346,
    "femininasLabel": "1.346 · estimado",
    "populacao": 9268836,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 413 hab. · 0,242%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Elmano de Freitas",
    "comando": "Comandante-Geral da PMCE — nome a confirmar em fonte oficial",
    "fonte": "IBGE 2025; FBSP/Anuário 2025; Pesquisa Perfil/SENASP; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pcce": {
    "nome": "Polícia Civil do Estado do Ceará",
    "sigla": "PCCE",
    "estado": "Ceará",
    "estadoSigla": "CE",
    "tipo": "Polícia Civil",
    "criacao": "10/05/1808 · alvará da Intendência Geral de Polícia · origem histórica; Polícia Civil estadual organizada por normas do Ceará",
    "ativa": 4149,
    "ativaLabel": "4.149 ativos (estimado)",
    "reserva": 4564,
    "reservaLabel": "4.564 inativos (estimado)",
    "femininas": 1079,
    "femininasLabel": "1.079 mulheres (estimado)",
    "populacao": 9268836,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 2.234 hab. · 0,045% (estimado)",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Elmano de Freitas",
    "comando": "Delegado Márcio Rodrigo Gutiérrez Rocha — Delegado-Geral",
    "siglaInterna": "PCCE",
    "efetivoTotalLabel": "Efetivo ativo/inativo em revisão · números operacionais marcados como estimados até publicação oficial consolidada",
    "estrutura": "Delegacia-Geral, Delegacia-Geral Adjunta, Diretoria de Planejamento e Gestão Interna, Gabinete, assessorias, Ouvidoria, Conselho Superior, Departamento de Polícia da Capital, Departamento de Polícia Metropolitana, Departamento de Polícia do Interior Norte, Departamento de Polícia do Interior Sul, DHPP, DPE, DRCO, DEPATRI, DRA, DTO, DIP, DPGV, CORE, CODIP, COGEP, COAFI, COLOG, COTIC, CO-SAÚDE e rede de delegacias distritais, metropolitanas, municipais, regionais e especializadas.",
    "sede": "Centro Integrado de Segurança Pública — CISP, Rua Professor Guilhon, s/n, Aeroporto, Fortaleza/CE — CEP 60.415-390",
    "emergencia": "197 · Disque-Denúncia 181 · emergência geral 190",
    "linksOficiais": [
      "https://www.policiacivil.ce.gov.br/",
      "https://www.policiacivil.ce.gov.br/institucional/",
      "https://www.policiacivil.ce.gov.br/quem-e-quem/",
      "https://www.policiacivil.ce.gov.br/contatos/",
      "https://www.cev.uece.br/oippcce/",
      "https://www.cebraspe.org.br/concursos/pc_ce_25_delegado"
    ],
    "fonte": "PCCE; SSPDS/CE; Governo do Ceará; CEV/UECE; Cebraspe; DOE/CE; Lei CE nº 12.124/1993; Lei CE nº 14.868/2011; Lei CE nº 19.128/2024; Lei CE nº 19.186/2025; Lei CE nº 19.706/2026; Decreto CE nº 35.521/2023; IBGE 2025; FBSP/SENASP para efetivo estimado",
    "atualizado": "PCCE revisada em 10/05/2026 — comando, estrutura, contatos, concursos e remuneração atualizados; efetivo ativo, inativos e mulheres marcados como estimados; tabela remuneratória de 2025/2026 deve ser conferida no DOE/CE e no contracheque"
  },
  "ppce": {
    "nome": "Polícia Penal do Ceará",
    "sigla": "PPCE",
    "estado": "Ceará",
    "estadoSigla": "CE",
    "tipo": "Polícia Penal",
    "criacao": "EC 104/2019 · Polícia Penal estadual/distrital",
    "ativa": 2959,
    "ativaLabel": "2.959",
    "reserva": 0,
    "reservaLabel": "0 · carreira civil sem reserva militar; inativos dependem do RPPS local",
    "femininas": 555,
    "femininasLabel": "555",
    "populacao": 23832,
    "populacaoTitulo": "Presos atendidos",
    "relacaoLabel": "1 servidor / 8 presos",
    "relacaoTitulo": "Relação ativa/presos",
    "governador": "Elmano de Freitas",
    "comando": "Diretor/Secretário da PPCE — nome a confirmar em fonte oficial",
    "fonte": "SISDEPEN/SENAPPEN 1º semestre/2025; IBGE 2025; FBSP/Anuário 2025; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pmdf": {
    "nome": "Polícia Militar do Distrito Federal",
    "sigla": "PMDF",
    "estado": "Distrito Federal",
    "estadoSigla": "DF",
    "tipo": "Polícia Militar",
    "criacao": "13/05/1809 · PMDF organizada no DF",
    "ativa": 10567,
    "ativaLabel": "10.567",
    "reserva": 11095,
    "reservaLabel": "11.095 · estimativa técnica",
    "femininas": 1374,
    "femininasLabel": "1.374 · estimado",
    "populacao": 2996899,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 284 hab. · 0,353%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Celina Leão",
    "comando": "Comandante-Geral da PMDF — nome a confirmar em fonte oficial",
    "fonte": "IBGE 2025; FBSP/Anuário 2025; Pesquisa Perfil/SENASP; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pcdf": {
    "nome": "Polícia Civil do Distrito Federal",
    "sigla": "PCDF",
    "estado": "Distrito Federal",
    "estadoSigla": "DF",
    "tipo": "Polícia Civil",
    "criacao": "10/05/1808 · Intendência-Geral de Polícia; PCDF em 1902; Brasília em 1960",
    "ativa": 3440,
    "ativaLabel": "3.440",
    "reserva": 3784,
    "reservaLabel": "3.784 · estimativa técnica",
    "femininas": 894,
    "femininasLabel": "894 · estimado",
    "populacao": 2996899,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 871 hab. · 0,115%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Celina Leão",
    "comando": "Delegado-Geral José Werick de Carvalho — nomeado em 02/10/2023",
    "fonte": "Base PCDF: história, símbolos e legislação institucional pesquisadas em 15/05/2026; confirmar dados mutáveis em canais oficiais.",
    "atualizado": "Base histórica revisada em 15/05/2026"
  },
  "ppdf": {
    "nome": "Polícia Penal do Distrito Federal",
    "sigla": "PPDF",
    "estado": "Distrito Federal",
    "estadoSigla": "DF",
    "tipo": "Polícia Penal",
    "criacao": "EC 104/2019 · Polícia Penal estadual/distrital",
    "ativa": 1523,
    "ativaLabel": "1.523",
    "reserva": 0,
    "reservaLabel": "0 · carreira civil sem reserva militar; inativos dependem do RPPS local",
    "femininas": 457,
    "femininasLabel": "457",
    "populacao": 16455,
    "populacaoTitulo": "Presos atendidos",
    "relacaoLabel": "1 servidor / 11 presos",
    "relacaoTitulo": "Relação ativa/presos",
    "governador": "Celina Leão",
    "comando": "Diretor/Secretário da PPDF — nome a confirmar em fonte oficial",
    "fonte": "SISDEPEN/SENAPPEN 1º semestre/2025; IBGE 2025; FBSP/Anuário 2025; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pmgo": {
    "nome": "Polícia Militar de Goiás",
    "sigla": "PMGO",
    "estado": "Goiás",
    "estadoSigla": "GO",
    "tipo": "Polícia Militar",
    "criacao": "28/07/1858",
    "ativa": 10987,
    "ativaLabel": "10.987",
    "reserva": 11536,
    "reservaLabel": "11.536 · estimativa técnica",
    "femininas": 1428,
    "femininasLabel": "1.428 · estimado",
    "populacao": 7423629,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 676 hab. · 0,148%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Daniel Vilela",
    "comando": "Comandante-Geral da PMGO — nome a confirmar em fonte oficial",
    "fonte": "IBGE 2025; FBSP/Anuário 2025; Pesquisa Perfil/SENASP; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pcgo": {
    "nome": "Polícia Civil de Goiás",
    "sigla": "PCGO",
    "estado": "Goiás",
    "estadoSigla": "GO",
    "tipo": "Polícia Civil",
    "criacao": "Polícia Civil estadual · origem histórica republicana",
    "ativa": 2884,
    "ativaLabel": "2.884",
    "reserva": 3172,
    "reservaLabel": "3.172 · estimativa técnica",
    "femininas": 750,
    "femininasLabel": "750 · estimado",
    "populacao": 7423629,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 2.574 hab. · 0,039%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Daniel Vilela",
    "comando": "Delegado-Geral da PCGO — nome a confirmar em fonte oficial",
    "fonte": "IBGE 2025; FBSP/Anuário 2025; Pesquisa Perfil/SENASP; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "ppgo": {
    "nome": "Polícia Penal de Goiás",
    "sigla": "PPGO",
    "estado": "Goiás",
    "estadoSigla": "GO",
    "tipo": "Polícia Penal",
    "criacao": "EC 104/2019 · Polícia Penal estadual/distrital",
    "ativa": 2517,
    "ativaLabel": "2.517",
    "reserva": 0,
    "reservaLabel": "0 · carreira civil sem reserva militar; inativos dependem do RPPS local",
    "femininas": 401,
    "femininasLabel": "401",
    "populacao": 18658,
    "populacaoTitulo": "Presos atendidos",
    "relacaoLabel": "1 servidor / 7 presos",
    "relacaoTitulo": "Relação ativa/presos",
    "governador": "Daniel Vilela",
    "comando": "Josimar Pires — Diretor-Geral da Polícia Penal de Goiás",
    "fonte": "SISDEPEN/SENAPPEN 1º semestre/2025; IBGE 2025; FBSP/Anuário 2025; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pmma": {
    "nome": "Polícia Militar do Maranhão",
    "sigla": "PMMA",
    "estado": "Maranhão",
    "estadoSigla": "MA",
    "tipo": "Polícia Militar",
    "criacao": "17/06/1836",
    "ativa": 11022,
    "ativaLabel": "11.022",
    "reserva": 11573,
    "reservaLabel": "11.573 · estimativa técnica",
    "femininas": 1433,
    "femininasLabel": "1.433 · estimado",
    "populacao": 7018211,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 637 hab. · 0,157%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Carlos Brandão Júnior",
    "comando": "Comandante-Geral da PMMA — nome a confirmar em fonte oficial",
    "fonte": "IBGE 2025; FBSP/Anuário 2025; Pesquisa Perfil/SENASP; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pcma": {
    "nome": "Polícia Civil do Maranhão",
    "sigla": "PCMA",
    "estado": "Maranhão",
    "estadoSigla": "MA",
    "tipo": "Polícia Civil",
    "criacao": "Polícia Civil estadual · origem histórica republicana",
    "ativa": 1782,
    "ativaLabel": "1.782",
    "reserva": 1960,
    "reservaLabel": "1.960 · estimativa técnica",
    "femininas": 463,
    "femininasLabel": "463 · estimado",
    "populacao": 7018211,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 3.938 hab. · 0,025%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Carlos Brandão Júnior",
    "comando": "Delegado-Geral da PCMA — nome a confirmar em fonte oficial",
    "fonte": "IBGE 2025; FBSP/Anuário 2025; Pesquisa Perfil/SENASP; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "ppma": {
    "nome": "Polícia Penal do Maranhão",
    "sigla": "PPMA",
    "estado": "Maranhão",
    "estadoSigla": "MA",
    "tipo": "Polícia Penal",
    "criacao": "EC 104/2019 · Polícia Penal estadual/distrital",
    "ativa": 3741,
    "ativaLabel": "3.741",
    "reserva": 0,
    "reservaLabel": "0 · carreira civil sem reserva militar; inativos dependem do RPPS local",
    "femininas": 473,
    "femininasLabel": "473",
    "populacao": 12551,
    "populacaoTitulo": "Presos atendidos",
    "relacaoLabel": "1 servidor / 3 presos",
    "relacaoTitulo": "Relação ativa/presos",
    "governador": "Carlos Brandão Júnior",
    "comando": "Diretor/Secretário da PPMA — nome a confirmar em fonte oficial",
    "fonte": "SISDEPEN/SENAPPEN 1º semestre/2025; IBGE 2025; FBSP/Anuário 2025; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pmpa": {
    "nome": "Polícia Militar do Pará",
    "sigla": "PMPA",
    "estado": "Pará",
    "estadoSigla": "PA",
    "tipo": "Polícia Militar",
    "criacao": "25/09/1818",
    "ativa": 17734,
    "ativaLabel": "17.734",
    "reserva": 18621,
    "reservaLabel": "18.621 · estimativa técnica",
    "femininas": 2305,
    "femininasLabel": "2.305 · estimado",
    "populacao": 8711196,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 491 hab. · 0,204%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Hana Ghassan",
    "comando": "Comandante-Geral da PMPA — nome a confirmar em fonte oficial",
    "fonte": "IBGE 2025; FBSP/Anuário 2025; Pesquisa Perfil/SENASP; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pcpa": {
    "nome": "Polícia Civil do Pará",
    "sigla": "PCPA",
    "estado": "Pará",
    "estadoSigla": "PA",
    "tipo": "Polícia Civil",
    "criacao": "Polícia Civil estadual · origem histórica republicana",
    "ativa": 3476,
    "ativaLabel": "3.476",
    "reserva": 3824,
    "reservaLabel": "3.824 · estimativa técnica",
    "femininas": 904,
    "femininasLabel": "904 · estimado",
    "populacao": 8711196,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 2.506 hab. · 0,040%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Hana Ghassan",
    "comando": "Delegado-Geral da PCPA — nome a confirmar em fonte oficial",
    "fonte": "IBGE 2025; FBSP/Anuário 2025; Pesquisa Perfil/SENASP; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pppa": {
    "nome": "Polícia Penal do Pará",
    "sigla": "PPPA",
    "estado": "Pará",
    "estadoSigla": "PA",
    "tipo": "Polícia Penal",
    "criacao": "EC 104/2019 · Polícia Penal estadual/distrital",
    "ativa": 2399,
    "ativaLabel": "2.399",
    "reserva": 0,
    "reservaLabel": "0 · carreira civil sem reserva militar; inativos dependem do RPPS local",
    "femininas": 411,
    "femininasLabel": "411",
    "populacao": 16349,
    "populacaoTitulo": "Presos atendidos",
    "relacaoLabel": "1 servidor / 7 presos",
    "relacaoTitulo": "Relação ativa/presos",
    "governador": "Hana Ghassan",
    "comando": "Diretor/Secretário da PPPA — nome a confirmar em fonte oficial",
    "fonte": "SISDEPEN/SENAPPEN 1º semestre/2025; IBGE 2025; FBSP/Anuário 2025; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pmpb": {
    "nome": "Polícia Militar da Paraíba",
    "sigla": "PMPB",
    "estado": "Paraíba",
    "estadoSigla": "PB",
    "tipo": "Polícia Militar",
    "criacao": "03/02/1832",
    "ativa": 8865,
    "ativaLabel": "8.865",
    "reserva": 9308,
    "reservaLabel": "9.308 · estimativa técnica",
    "femininas": 798,
    "femininasLabel": "798 · estimado",
    "populacao": 4164468,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 470 hab. · 0,213%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Lucas Ribeiro",
    "comando": "Comandante-Geral da PMPB — nome a confirmar em fonte oficial",
    "fonte": "IBGE 2025; FBSP/Anuário 2025; Pesquisa Perfil/SENASP; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pcpb": {
    "nome": "Polícia Civil da Paraíba",
    "sigla": "PCPB",
    "estado": "Paraíba",
    "estadoSigla": "PB",
    "tipo": "Polícia Civil",
    "criacao": "Polícia Civil estadual · origem histórica republicana",
    "ativa": 1640,
    "ativaLabel": "1.640",
    "reserva": 1804,
    "reservaLabel": "1.804 · estimativa técnica",
    "femininas": 426,
    "femininasLabel": "426 · estimado",
    "populacao": 4164468,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 2.539 hab. · 0,039%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Lucas Ribeiro",
    "comando": "Delegado-Geral da PCPB — nome a confirmar em fonte oficial",
    "fonte": "IBGE 2025; FBSP/Anuário 2025; Pesquisa Perfil/SENASP; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pppb": {
    "nome": "Polícia Penal da Paraíba",
    "sigla": "PPPB",
    "estado": "Paraíba",
    "estadoSigla": "PB",
    "tipo": "Polícia Penal",
    "criacao": "EC 104/2019 · Polícia Penal estadual/distrital",
    "ativa": 1372,
    "ativaLabel": "1.372",
    "reserva": 0,
    "reservaLabel": "0 · carreira civil sem reserva militar; inativos dependem do RPPS local",
    "femininas": 194,
    "femininasLabel": "194",
    "populacao": 13238,
    "populacaoTitulo": "Presos atendidos",
    "relacaoLabel": "1 servidor / 10 presos",
    "relacaoTitulo": "Relação ativa/presos",
    "governador": "Lucas Ribeiro",
    "comando": "Diretor/Secretário da PPPB — nome a confirmar em fonte oficial",
    "fonte": "SISDEPEN/SENAPPEN 1º semestre/2025; IBGE 2025; FBSP/Anuário 2025; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pmpe": {
    "nome": "Polícia Militar de Pernambuco",
    "sigla": "PMPE",
    "estado": "Pernambuco",
    "estadoSigla": "PE",
    "tipo": "Polícia Militar",
    "criacao": "11/06/1825",
    "ativa": 16563,
    "ativaLabel": "16.563",
    "reserva": 17391,
    "reservaLabel": "17.391 · estimativa técnica",
    "femininas": 2153,
    "femininasLabel": "2.153 · estimado",
    "populacao": 9562007,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 577 hab. · 0,173%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Raquel Lyra",
    "comando": "Comandante-Geral da PMPE — nome a confirmar em fonte oficial",
    "fonte": "IBGE 2025; FBSP/Anuário 2025; Pesquisa Perfil/SENASP; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pcpe": {
    "nome": "Polícia Civil de Pernambuco",
    "sigla": "PCPE",
    "estado": "Pernambuco",
    "estadoSigla": "PE",
    "tipo": "Polícia Civil",
    "criacao": "Polícia Civil estadual · origem histórica republicana",
    "ativa": 4663,
    "ativaLabel": "4.663",
    "reserva": 5129,
    "reservaLabel": "5.129 · estimativa técnica",
    "femininas": 1212,
    "femininasLabel": "1.212 · estimado",
    "populacao": 9562007,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 2.051 hab. · 0,049%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Raquel Lyra",
    "comando": "Delegado-Geral da PCPE — nome a confirmar em fonte oficial",
    "fonte": "IBGE 2025; FBSP/Anuário 2025; Pesquisa Perfil/SENASP; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pppe": {
    "nome": "Polícia Penal de Pernambuco",
    "sigla": "PPPE",
    "estado": "Pernambuco",
    "estadoSigla": "PE",
    "tipo": "Polícia Penal",
    "criacao": "EC 104/2019 · Polícia Penal estadual/distrital",
    "ativa": 1360,
    "ativaLabel": "1.360",
    "reserva": 0,
    "reservaLabel": "0 · carreira civil sem reserva militar; inativos dependem do RPPS local",
    "femininas": 248,
    "femininasLabel": "248",
    "populacao": 29869,
    "populacaoTitulo": "Presos atendidos",
    "relacaoLabel": "1 servidor / 22 presos",
    "relacaoTitulo": "Relação ativa/presos",
    "governador": "Raquel Lyra",
    "comando": "Diretor/Secretário da PPPE — nome a confirmar em fonte oficial",
    "fonte": "SISDEPEN/SENAPPEN 1º semestre/2025; IBGE 2025; FBSP/Anuário 2025; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pmpi": {
    "nome": "Polícia Militar do Piauí",
    "sigla": "PMPI",
    "estado": "Piauí",
    "estadoSigla": "PI",
    "tipo": "Polícia Militar",
    "criacao": "25/06/1835",
    "ativa": 6707,
    "ativaLabel": "6.707",
    "reserva": 7042,
    "reservaLabel": "7.042 · estimativa técnica",
    "femininas": 604,
    "femininasLabel": "604 · estimado",
    "populacao": 3384547,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 505 hab. · 0,198%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Rafael Fonteles",
    "comando": "Comandante-Geral da PMPI — nome a confirmar em fonte oficial",
    "fonte": "IBGE 2025; FBSP/Anuário 2025; Pesquisa Perfil/SENASP; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pcpi": {
    "nome": "Polícia Civil do Piauí",
    "sigla": "PCPI",
    "estado": "Piauí",
    "estadoSigla": "PI",
    "tipo": "Polícia Civil",
    "criacao": "Polícia Civil estadual · origem histórica republicana",
    "ativa": 1621,
    "ativaLabel": "1.621",
    "reserva": 1783,
    "reservaLabel": "1.783 · estimativa técnica",
    "femininas": 421,
    "femininasLabel": "421 · estimado",
    "populacao": 3384547,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 2.088 hab. · 0,048%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Rafael Fonteles",
    "comando": "Delegado-Geral da PCPI — nome a confirmar em fonte oficial",
    "fonte": "IBGE 2025; FBSP/Anuário 2025; Pesquisa Perfil/SENASP; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pppi": {
    "nome": "Polícia Penal do Piauí",
    "sigla": "PPPI",
    "estado": "Piauí",
    "estadoSigla": "PI",
    "tipo": "Polícia Penal",
    "criacao": "EC 104/2019 · Polícia Penal estadual/distrital",
    "ativa": 801,
    "ativaLabel": "801",
    "reserva": 0,
    "reservaLabel": "0 · carreira civil sem reserva militar; inativos dependem do RPPS local",
    "femininas": 251,
    "femininasLabel": "251",
    "populacao": 7777,
    "populacaoTitulo": "Presos atendidos",
    "relacaoLabel": "1 servidor / 10 presos",
    "relacaoTitulo": "Relação ativa/presos",
    "governador": "Rafael Fonteles",
    "comando": "Diretor/Secretário da PPPI — nome a confirmar em fonte oficial",
    "fonte": "SISDEPEN/SENAPPEN 1º semestre/2025; IBGE 2025; FBSP/Anuário 2025; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pmrn": {
    "nome": "Polícia Militar do Rio Grande do Norte",
    "sigla": "PMRN",
    "estado": "Rio Grande do Norte",
    "estadoSigla": "RN",
    "tipo": "Polícia Militar",
    "criacao": "27/06/1834",
    "ativa": 8191,
    "ativaLabel": "8.191",
    "reserva": 8601,
    "reservaLabel": "8.601 · estimativa técnica",
    "femininas": 491,
    "femininasLabel": "491 · estimado",
    "populacao": 3455236,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 422 hab. · 0,237%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Fátima Bezerra",
    "comando": "Comandante-Geral da PMRN — nome a confirmar em fonte oficial",
    "fonte": "IBGE 2025; FBSP/Anuário 2025; Pesquisa Perfil/SENASP; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pcrn": {
    "nome": "Polícia Civil do Rio Grande do Norte",
    "sigla": "PCRN",
    "estado": "Rio Grande do Norte",
    "estadoSigla": "RN",
    "tipo": "Polícia Civil",
    "criacao": "Polícia Civil estadual · origem histórica republicana",
    "ativa": 1561,
    "ativaLabel": "1.561",
    "reserva": 1717,
    "reservaLabel": "1.717 · estimativa técnica",
    "femininas": 406,
    "femininasLabel": "406 · estimado",
    "populacao": 3455236,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 2.213 hab. · 0,045%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Fátima Bezerra",
    "comando": "Delegado-Geral da PCRN — nome a confirmar em fonte oficial",
    "fonte": "IBGE 2025; FBSP/Anuário 2025; Pesquisa Perfil/SENASP; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pprn": {
    "nome": "Polícia Penal do Rio Grande do Norte",
    "sigla": "PPRN",
    "estado": "Rio Grande do Norte",
    "estadoSigla": "RN",
    "tipo": "Polícia Penal",
    "criacao": "EC 104/2019 · Polícia Penal estadual/distrital",
    "ativa": 995,
    "ativaLabel": "995",
    "reserva": 0,
    "reservaLabel": "0 · carreira civil sem reserva militar; inativos dependem do RPPS local",
    "femininas": 229,
    "femininasLabel": "229",
    "populacao": 7907,
    "populacaoTitulo": "Presos atendidos",
    "relacaoLabel": "1 servidor / 8 presos",
    "relacaoTitulo": "Relação ativa/presos",
    "governador": "Fátima Bezerra",
    "comando": "Regina Ribeiro — Diretora-Geral da Polícia Penal do RN",
    "fonte": "SISDEPEN/SENAPPEN 1º semestre/2025; IBGE 2025; FBSP/Anuário 2025; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pmro": {
    "nome": "Polícia Militar de Rondônia",
    "sigla": "PMRO",
    "estado": "Rondônia",
    "estadoSigla": "RO",
    "tipo": "Polícia Militar",
    "criacao": "26/11/1975",
    "ativa": 4955,
    "ativaLabel": "4.955",
    "reserva": 5203,
    "reservaLabel": "5.203 · estimativa técnica",
    "femininas": 644,
    "femininasLabel": "644 · estimado",
    "populacao": 1751950,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 354 hab. · 0,283%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Marcos Rocha",
    "comando": "Comandante-Geral da PMRO — nome a confirmar em fonte oficial",
    "fonte": "IBGE 2025; FBSP/Anuário 2025; Pesquisa Perfil/SENASP; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pcro": {
    "nome": "Polícia Civil de Rondônia",
    "sigla": "PCRO",
    "estado": "Rondônia",
    "estadoSigla": "RO",
    "tipo": "Polícia Civil",
    "criacao": "Polícia Civil estadual · estrutura estadual",
    "ativa": 1332,
    "ativaLabel": "1.332",
    "reserva": 1465,
    "reservaLabel": "1.465 · estimativa técnica",
    "femininas": 346,
    "femininasLabel": "346 · estimado",
    "populacao": 1751950,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 1.315 hab. · 0,076%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Marcos Rocha",
    "comando": "Delegado-Geral da PCRO — nome a confirmar em fonte oficial",
    "fonte": "IBGE 2025; FBSP/Anuário 2025; Pesquisa Perfil/SENASP; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "ppro": {
    "nome": "Polícia Penal de Rondônia",
    "sigla": "PPRO",
    "estado": "Rondônia",
    "estadoSigla": "RO",
    "tipo": "Polícia Penal",
    "criacao": "EC 104/2019 · Polícia Penal estadual/distrital",
    "ativa": 1590,
    "ativaLabel": "1.590",
    "reserva": 0,
    "reservaLabel": "0 · carreira civil sem reserva militar; inativos dependem do RPPS local",
    "femininas": 229,
    "femininasLabel": "229",
    "populacao": 7528,
    "populacaoTitulo": "Presos atendidos",
    "relacaoLabel": "1 servidor / 5 presos",
    "relacaoTitulo": "Relação ativa/presos",
    "governador": "Marcos Rocha",
    "comando": "Diretor/Secretário da PPRO — nome a confirmar em fonte oficial",
    "fonte": "SISDEPEN/SENAPPEN 1º semestre/2025; IBGE 2025; FBSP/Anuário 2025; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pmrr": {
    "nome": "Polícia Militar de Roraima",
    "sigla": "PMRR",
    "estado": "Roraima",
    "estadoSigla": "RR",
    "tipo": "Polícia Militar",
    "criacao": "21/11/1975",
    "ativa": 2485,
    "ativaLabel": "2.485",
    "reserva": 2609,
    "reservaLabel": "2.609 · estimativa técnica",
    "femininas": 522,
    "femininasLabel": "522 · estimado",
    "populacao": 738772,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 297 hab. · 0,336%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Soldado Sampaio — Governador em exercício",
    "comando": "Comandante-Geral da PMRR — nome a confirmar em fonte oficial",
    "fonte": "IBGE 2025; FBSP/Anuário 2025; Pesquisa Perfil/SENASP; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pcrr": {
    "nome": "Polícia Civil de Roraima",
    "sigla": "PCRR",
    "estado": "Roraima",
    "estadoSigla": "RR",
    "tipo": "Polícia Civil",
    "criacao": "Polícia Civil estadual · estrutura estadual",
    "ativa": 673,
    "ativaLabel": "673",
    "reserva": 740,
    "reservaLabel": "740 · estimativa técnica",
    "femininas": 175,
    "femininasLabel": "175 · estimado",
    "populacao": 738772,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 1.098 hab. · 0,091%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Soldado Sampaio — Governador em exercício",
    "comando": "Delegado-Geral da PCRR — nome a confirmar em fonte oficial",
    "fonte": "IBGE 2025; FBSP/Anuário 2025; Pesquisa Perfil/SENASP; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pprr": {
    "nome": "Polícia Penal de Roraima",
    "sigla": "PPRR",
    "estado": "Roraima",
    "estadoSigla": "RR",
    "tipo": "Polícia Penal",
    "criacao": "EC 104/2019 · Polícia Penal estadual/distrital",
    "ativa": 399,
    "ativaLabel": "399",
    "reserva": 0,
    "reservaLabel": "0 · carreira civil sem reserva militar; inativos dependem do RPPS local",
    "femininas": 91,
    "femininasLabel": "91",
    "populacao": 3209,
    "populacaoTitulo": "Presos atendidos",
    "relacaoLabel": "1 servidor / 8 presos",
    "relacaoTitulo": "Relação ativa/presos",
    "governador": "Soldado Sampaio — Governador em exercício",
    "comando": "Diretor/Secretário da PPRR — nome a confirmar em fonte oficial",
    "fonte": "SISDEPEN/SENAPPEN 1º semestre/2025; IBGE 2025; FBSP/Anuário 2025; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pmse": {
    "nome": "Polícia Militar de Sergipe",
    "sigla": "PMSE",
    "estado": "Sergipe",
    "estadoSigla": "SE",
    "tipo": "Polícia Militar",
    "criacao": "28/02/1835",
    "ativa": 5870,
    "ativaLabel": "5.870",
    "reserva": 6164,
    "reservaLabel": "6.164 · estimativa técnica",
    "femininas": 763,
    "femininasLabel": "763 · estimado",
    "populacao": 2299425,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 392 hab. · 0,255%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Fábio Mitidieri",
    "comando": "Comandante-Geral da PMSE — nome a confirmar em fonte oficial",
    "fonte": "IBGE 2025; FBSP/Anuário 2025; Pesquisa Perfil/SENASP; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pcse": {
    "nome": "Polícia Civil de Sergipe",
    "sigla": "PCSE",
    "estado": "Sergipe",
    "estadoSigla": "SE",
    "tipo": "Polícia Civil",
    "criacao": "Polícia Civil estadual · origem histórica republicana",
    "ativa": 1308,
    "ativaLabel": "1.308",
    "reserva": 1439,
    "reservaLabel": "1.439 · estimativa técnica",
    "femininas": 340,
    "femininasLabel": "340 · estimado",
    "populacao": 2299425,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 1.758 hab. · 0,057%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Fábio Mitidieri",
    "comando": "Delegado-Geral da PCSE — nome a confirmar em fonte oficial",
    "fonte": "IBGE 2025; FBSP/Anuário 2025; Pesquisa Perfil/SENASP; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "ppse": {
    "nome": "Polícia Penal de Sergipe",
    "sigla": "PPSE",
    "estado": "Sergipe",
    "estadoSigla": "SE",
    "tipo": "Polícia Penal",
    "criacao": "EC 104/2019 · Polícia Penal estadual/distrital",
    "ativa": 890,
    "ativaLabel": "890",
    "reserva": 0,
    "reservaLabel": "0 · carreira civil sem reserva militar; inativos dependem do RPPS local",
    "femininas": 167,
    "femininasLabel": "167",
    "populacao": 6022,
    "populacaoTitulo": "Presos atendidos",
    "relacaoLabel": "1 servidor / 7 presos",
    "relacaoTitulo": "Relação ativa/presos",
    "governador": "Fábio Mitidieri",
    "comando": "Diretor/Secretário da PPSE — nome a confirmar em fonte oficial",
    "fonte": "SISDEPEN/SENAPPEN 1º semestre/2025; IBGE 2025; FBSP/Anuário 2025; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pmto": {
    "nome": "Polícia Militar do Tocantins",
    "sigla": "PMTO",
    "estado": "Tocantins",
    "estadoSigla": "TO",
    "tipo": "Polícia Militar",
    "criacao": "01/01/1989",
    "ativa": 3534,
    "ativaLabel": "3.534",
    "reserva": 3711,
    "reservaLabel": "3.711 · estimativa técnica",
    "femininas": 459,
    "femininasLabel": "459 · estimado",
    "populacao": 1586859,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 449 hab. · 0,223%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Wanderlei Barbosa",
    "comando": "Comandante-Geral da PMTO — nome a confirmar em fonte oficial",
    "fonte": "IBGE 2025; FBSP/Anuário 2025; Pesquisa Perfil/SENASP; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "pcto": {
    "nome": "Polícia Civil do Tocantins",
    "sigla": "PCTO",
    "estado": "Tocantins",
    "estadoSigla": "TO",
    "tipo": "Polícia Civil",
    "criacao": "Polícia Civil estadual · estrutura do Tocantins",
    "ativa": 1129,
    "ativaLabel": "1.129",
    "reserva": 1242,
    "reservaLabel": "1.242 · estimativa técnica",
    "femininas": 294,
    "femininasLabel": "294 · estimado",
    "populacao": 1586859,
    "populacaoTitulo": "População do Estado",
    "relacaoLabel": "1 ativo / 1.406 hab. · 0,071%",
    "relacaoTitulo": "Relação ativa/população",
    "governador": "Wanderlei Barbosa",
    "comando": "Delegado-Geral da PCTO — nome a confirmar em fonte oficial",
    "fonte": "IBGE 2025; FBSP/Anuário 2025; Pesquisa Perfil/SENASP; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  },
  "ppto": {
    "nome": "Polícia Penal do Tocantins",
    "sigla": "PPTO",
    "estado": "Tocantins",
    "estadoSigla": "TO",
    "tipo": "Polícia Penal",
    "criacao": "EC 104/2019 · Polícia Penal estadual/distrital",
    "ativa": 881,
    "ativaLabel": "881",
    "reserva": 0,
    "reservaLabel": "0 · carreira civil sem reserva militar; inativos dependem do RPPS local",
    "femininas": 106,
    "femininasLabel": "106",
    "populacao": 4145,
    "populacaoTitulo": "Presos atendidos",
    "relacaoLabel": "1 servidor / 5 presos",
    "relacaoTitulo": "Relação ativa/presos",
    "governador": "Wanderlei Barbosa",
    "comando": "Diretor/Secretário da PPTO — nome a confirmar em fonte oficial",
    "fonte": "SISDEPEN/SENAPPEN 1º semestre/2025; IBGE 2025; FBSP/Anuário 2025; transparências estaduais quando disponível",
    "atualizado": "Base numérica inserida em 01/05/2026"
  }
};




/* ============================================================ */
/* === ESTRUTURA-BASE PARA UFs FALTANTES ======================= */
/* ============================================================ */
/*
  Bloco de expansão criado para manter os estados já cadastrados e abrir
  a estrutura dos demais entes da federação. Os valores ficam como
  "A confirmar" para permitir o preenchimento detalhado depois, sem
  copiar remunerações de São Paulo para outras UFs.
*/
const ESTADOS_ESTRUTURA_FALTANTES = [
  { estado: 'al', nome: 'Alagoas', sigla: 'AL', pm: 'pmal', pc: 'pcal', pp: 'ppal', pmSigla: 'PMAL', pcSigla: 'PCAL', ppSigla: 'PPAL', flag: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira_de_Alagoas.svg' },
  { estado: 'am', nome: 'Amazonas', sigla: 'AM', pm: 'pmam', pc: 'pcam', pp: 'ppam', pmSigla: 'PMAM', pcSigla: 'PCAM', ppSigla: 'PPAM', flag: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira_do_Amazonas.svg' },
  { estado: 'ap', nome: 'Amapá', sigla: 'AP', pm: 'pmap', pc: 'pcap', pp: 'ppap', pmSigla: 'PMAP', pcSigla: 'PCAP', ppSigla: 'PPAP', flag: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira_do_Amap%C3%A1.svg' },
  { estado: 'ce', nome: 'Ceará', sigla: 'CE', pm: 'pmce', pc: 'pcce', pp: 'ppce', pmSigla: 'PMCE', pcSigla: 'PCCE', ppSigla: 'PPCE', flag: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira_do_Cear%C3%A1.svg' },
  { estado: 'df', nome: 'Distrito Federal', sigla: 'DF', pm: 'pmdf', pc: 'pcdf', pp: 'ppdf', pmSigla: 'PMDF', pcSigla: 'PCDF', ppSigla: 'PPDF', flag: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira_do_Distrito_Federal_(Brasil).svg' },
  { estado: 'go', nome: 'Goiás', sigla: 'GO', pm: 'pmgo', pc: 'pcgo', pp: 'ppgo', pmSigla: 'PMGO', pcSigla: 'PCGO', ppSigla: 'PPGO', flag: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira_de_Goi%C3%A1s.svg' },
  { estado: 'ma', nome: 'Maranhão', sigla: 'MA', pm: 'pmma', pc: 'pcma', pp: 'ppma', pmSigla: 'PMMA', pcSigla: 'PCMA', ppSigla: 'PPMA', flag: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira_do_Maranh%C3%A3o.svg' },
  { estado: 'pa', nome: 'Pará', sigla: 'PA', pm: 'pmpa', pc: 'pcpa', pp: 'pppa', pmSigla: 'PMPA', pcSigla: 'PCPA', ppSigla: 'PPPA', flag: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira_do_Par%C3%A1.svg' },
  { estado: 'pb', nome: 'Paraíba', sigla: 'PB', pm: 'pmpb', pc: 'pcpb', pp: 'pppb', pmSigla: 'PMPB', pcSigla: 'PCPB', ppSigla: 'PPPB', flag: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira_da_Para%C3%ADba.svg' },
  { estado: 'pe', nome: 'Pernambuco', sigla: 'PE', pm: 'pmpe', pc: 'pcpe', pp: 'pppe', pmSigla: 'PMPE', pcSigla: 'PCPE', ppSigla: 'PPPE', flag: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira_de_Pernambuco.svg' },
  { estado: 'pi', nome: 'Piauí', sigla: 'PI', pm: 'pmpi', pc: 'pcpi', pp: 'pppi', pmSigla: 'PMPI', pcSigla: 'PCPI', ppSigla: 'PPPI', flag: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira_do_Piau%C3%AD.svg' },
  { estado: 'rn', nome: 'Rio Grande do Norte', sigla: 'RN', pm: 'pmrn', pc: 'pcrn', pp: 'pprn', pmSigla: 'PMRN', pcSigla: 'PCRN', ppSigla: 'PPRN', flag: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira_do_Rio_Grande_do_Norte.svg' },
  { estado: 'ro', nome: 'Rondônia', sigla: 'RO', pm: 'pmro', pc: 'pcro', pp: 'ppro', pmSigla: 'PMRO', pcSigla: 'PCRO', ppSigla: 'PPRO', flag: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira_de_Rond%C3%B4nia.svg' },
  { estado: 'rr', nome: 'Roraima', sigla: 'RR', pm: 'pmrr', pc: 'pcrr', pp: 'pprr', pmSigla: 'PMRR', pcSigla: 'PCRR', ppSigla: 'PPRR', flag: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira_de_Roraima.svg' },
  { estado: 'se', nome: 'Sergipe', sigla: 'SE', pm: 'pmse', pc: 'pcse', pp: 'ppse', pmSigla: 'PMSE', pcSigla: 'PCSE', ppSigla: 'PPSE', flag: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira_de_Sergipe.svg' },
  { estado: 'to', nome: 'Tocantins', sigla: 'TO', pm: 'pmto', pc: 'pcto', pp: 'ppto', pmSigla: 'PMTO', pcSigla: 'PCTO', ppSigla: 'PPTO', flag: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira_do_Tocantins.svg' }
];

const CARGOS_ESTRUTURA_GENERICAS = {};
const CONFIGS_INSTITUICOES_GENERICAS = {};

function criarCargoEstrutural(inst, val, text, oficial = false, selected = false) {
  return {
    val: `${val}_${inst}`,
    text,
    padrao: 0,
    gratif: 0,
    oficial,
    selected,
    retpFator: 0,
    valorPendente: true,
    fonteKey: inst,
    criterio: 'Estrutura-base cadastrada. Informe depois a tabela remuneratória oficial, lei, edital, classe/referência e rubricas da instituição.',
    benefDesc: 'Auxílios, adicionais, indenizações, escalas, gratificações e vantagens dependem da legislação local e ainda não foram preenchidos.',
    badge: 'Estrutura a preencher'
  };
}

function criarCargosPmEstrutura(inst, sigla) {
  return [
    criarCargoEstrutural(inst, 'cmtg', `${sigla} — Comandante-Geral`, true),
    criarCargoEstrutural(inst, 'cel', `${sigla} — Coronel`, true),
    criarCargoEstrutural(inst, 'tencel', `${sigla} — Tenente-Coronel`, true),
    criarCargoEstrutural(inst, 'maj', `${sigla} — Major`, true),
    criarCargoEstrutural(inst, 'cap', `${sigla} — Capitão`, true),
    criarCargoEstrutural(inst, '1ten', `${sigla} — 1º Tenente`, true),
    criarCargoEstrutural(inst, '2ten', `${sigla} — 2º Tenente`, true),
    criarCargoEstrutural(inst, 'aspof', `${sigla} — Aspirante a Oficial`, true),
    criarCargoEstrutural(inst, 'alof', `${sigla} — Aluno-Oficial / CFO`, false),
    criarCargoEstrutural(inst, 'subten', `${sigla} — Subtenente`, false),
    criarCargoEstrutural(inst, '1sgt', `${sigla} — 1º Sargento`, false),
    criarCargoEstrutural(inst, '2sgt', `${sigla} — 2º Sargento`, false),
    criarCargoEstrutural(inst, '3sgt', `${sigla} — 3º Sargento`, false),
    criarCargoEstrutural(inst, 'cabo', `${sigla} — Cabo`, false),
    criarCargoEstrutural(inst, 'sd1', `${sigla} — Soldado 1ª Classe`, false, true),
    criarCargoEstrutural(inst, 'sd2', `${sigla} — Soldado 2ª Classe / Aluno-Soldado`, false)
  ];
}


function criarCargosBombeiroEstrutura(inst, sigla) {
  return [
    criarCargoEstrutural(inst, 'cmtg', `${sigla} — Comandante-Geral`, true),
    criarCargoEstrutural(inst, 'subcmtg', `${sigla} — Subcomandante-Geral`, true),
    criarCargoEstrutural(inst, 'cel', `${sigla} — Coronel BM`, true),
    criarCargoEstrutural(inst, 'tencel', `${sigla} — Tenente-Coronel BM`, true),
    criarCargoEstrutural(inst, 'maj', `${sigla} — Major BM`, true),
    criarCargoEstrutural(inst, 'cap', `${sigla} — Capitão BM`, true),
    criarCargoEstrutural(inst, '1ten', `${sigla} — 1º Tenente BM`, true),
    criarCargoEstrutural(inst, '2ten', `${sigla} — 2º Tenente BM`, true),
    criarCargoEstrutural(inst, 'aspof', `${sigla} — Aspirante a Oficial BM`, true),
    criarCargoEstrutural(inst, 'alof', `${sigla} — Aluno-Oficial / CFO BM`, false),
    criarCargoEstrutural(inst, 'subten', `${sigla} — Subtenente BM`, false),
    criarCargoEstrutural(inst, '1sgt', `${sigla} — 1º Sargento BM`, false),
    criarCargoEstrutural(inst, '2sgt', `${sigla} — 2º Sargento BM`, false),
    criarCargoEstrutural(inst, '3sgt', `${sigla} — 3º Sargento BM`, false),
    criarCargoEstrutural(inst, 'cabo', `${sigla} — Cabo BM`, false),
    criarCargoEstrutural(inst, 'sd1', `${sigla} — Soldado BM 1ª Classe`, false, true),
    criarCargoEstrutural(inst, 'sd2', `${sigla} — Soldado BM 2ª Classe / Aluno-Soldado`, false)
  ];
}

function criarCargosPcEstrutura(inst, sigla) {
  return [
    criarCargoEstrutural(inst, 'delegado_geral', `${sigla} — Delegado-Geral / Direção Superior`, true),
    criarCargoEstrutural(inst, 'delegado_esp', `${sigla} — Delegado de Polícia — Classe Especial`, true),
    criarCargoEstrutural(inst, 'delegado_1', `${sigla} — Delegado de Polícia — 1ª Classe`, true),
    criarCargoEstrutural(inst, 'delegado_2', `${sigla} — Delegado de Polícia — 2ª Classe`, true),
    criarCargoEstrutural(inst, 'delegado_3', `${sigla} — Delegado de Polícia — Classe Inicial`, true),
    criarCargoEstrutural(inst, 'perito_esp', `${sigla} — Perito / Médico Legista — Classe Especial`, true),
    criarCargoEstrutural(inst, 'perito_1', `${sigla} — Perito / Médico Legista — 1ª Classe`, true),
    criarCargoEstrutural(inst, 'perito_2', `${sigla} — Perito / Médico Legista — 2ª Classe`, true),
    criarCargoEstrutural(inst, 'perito_3', `${sigla} — Perito / Médico Legista — Classe Inicial`, true),
    criarCargoEstrutural(inst, 'investigador_esp', `${sigla} — Investigador / Agente / Escrivão — Classe Especial`, false),
    criarCargoEstrutural(inst, 'investigador_1', `${sigla} — Investigador / Agente / Escrivão — 1ª Classe`, false),
    criarCargoEstrutural(inst, 'investigador_2', `${sigla} — Investigador / Agente / Escrivão — 2ª Classe`, false),
    criarCargoEstrutural(inst, 'investigador_3', `${sigla} — Investigador / Agente / Escrivão — Classe Inicial`, false, true),
    criarCargoEstrutural(inst, 'papiloscopista', `${sigla} — Papiloscopista / Auxiliar / Técnico Policial`, false)
  ];
}

function criarCargosPpEstrutura(inst, sigla) {
  return [
    criarCargoEstrutural(inst, 'direcao_superior', `${sigla} — Direção / Comando da Polícia Penal`, true),
    criarCargoEstrutural(inst, 'classe_esp', `${sigla} — Policial Penal — Classe Especial`, false),
    criarCargoEstrutural(inst, 'classe_1', `${sigla} — Policial Penal — 1ª Classe`, false),
    criarCargoEstrutural(inst, 'classe_2', `${sigla} — Policial Penal — 2ª Classe`, false),
    criarCargoEstrutural(inst, 'classe_3', `${sigla} — Policial Penal — Classe Inicial`, false, true),
    criarCargoEstrutural(inst, 'aluno_formacao', `${sigla} — Aluno / Curso de Formação`, false)
  ];
}

function criarInfoPenalEstrutura(estado) {
  return {
    sigla: estado.ppSigla,
    nome: `Polícia Penal de ${estado.nome}`,
    uf: estado.nome,
    criacao: 'EC 104/2019 · estrutura estadual/distrital a preencher',
    marco: 'Estrutura aberta no site para receber histórico, legislação, carreira, organograma e dados oficiais da Polícia Penal local.',
    orgao: `Órgão gestor da administração penitenciária de ${estado.nome} — preencher`,
    direcao: 'Direção/comando atual — preencher',
    subordinacao: 'Sistema penitenciário estadual/distrital — preencher conforme legislação local.',
    efetivoAtivoLabel: 'Efetivo ativo — preencher',
    reservaLabel: 'Inativos/reserva — preencher',
    totalLabel: 'Total — preencher',
    relacaoLabel: 'Relação por habitante — preencher após informar efetivo e população',
    quadro: 'Quadro e carreira da Polícia Penal — preencher com lei, classes, níveis e requisitos.',
    ingresso: 'Concurso público, curso de formação, investigação social, exames, TAF e demais fases conforme edital local.',
    escolaridade: 'Preencher conforme edital vigente ou legislação da carreira.',
    formacao: 'Curso de formação e capacitação continuada — preencher com regras locais.',
    atribuicoes: 'Segurança interna e externa de unidades penais, custódia, escoltas, disciplina, inteligência prisional e demais atribuições legais — detalhar conforme norma local.',
    remuneracao: 'Tabela remuneratória ainda não preenchida; inserir valores oficiais, classe/referência e rubricas da carreira.',
    vantagens: 'Auxílios, adicionais, plantões, indenizações e vantagens a preencher conforme lei, escala, lotação e contracheque.',
    saude: 'Assistência à saúde e previdência — preencher conforme regime estadual/distrital.',
    previdencia: 'Regime próprio/previdência local — preencher regras, contribuição e aposentadoria policial aplicável.',
    concurso: {
      vagas: 'Preencher com edital/autorização vigente.',
      salario: 'A confirmar em edital, tabela oficial ou Diário Oficial.',
      banca: 'A definir/preencher conforme edital.',
      escolaridade: 'Preencher conforme edital.'
    },
    associacaoBusca: `associação ou sindicato dos policiais penais de ${estado.nome}`,
    fonte: `Fontes oficiais de ${estado.nome} — preencher`,
    url: '#',
    atualizado: 'Estrutura criada para preenchimento'
  };
}

function criarConcursoEstrutura(inst, info, ramo) {
  return {
    edital: `${info.titulo} — ${info.desc} — estrutura de concurso a preencher`,
    salario: 'A confirmar em edital, tabela oficial ou Diário Oficial.',
    vagas: 'Preencher com edital/autorização vigente.',
    cotas: 'Preencher conforme legislação local e edital.',
    idade: 'Preencher requisitos de idade, CNH, altura, aptidão física e demais exigências conforme edital.',
    escolaridade: 'Preencher escolaridade e requisitos do cargo conforme edital.',
    banca: 'A definir/preencher conforme edital.',
    inscritos: 'Preencher quando houver dado oficial.',
    materias: 'Preencher disciplinas conforme edital do cargo.',
    etapas: ['pm', 'bm'].includes(ramo)
      ? 'Prova objetiva/discursiva quando prevista, TAF, exames médicos, avaliação psicológica, investigação social, curso de formação militar e demais etapas do edital.'
      : 'Prova objetiva/discursiva quando prevista, exames, investigação social, TAF quando aplicável, avaliação psicológica, curso de formação e demais etapas do edital.',
    cfsd: ['pm', 'bm'].includes(ramo) ? 'Curso de Formação de Soldados/Oficiais — preencher.' : 'Curso de formação profissional — preencher.',
    estagio: 'Estágio probatório e desenvolvimento na carreira — preencher conforme lei local.',
    validade: 'Preencher conforme edital e atos de homologação/prorrogação.',
    previsao: 'Acompanhar Diário Oficial, órgão oficial e banca. Não afirmar concurso aberto sem publicação oficial.',
    site: '#'
  };
}

function criarAcoesEstrutura(info) {
  return [
    { titulo: `${info.titulo} — Estrutura de direitos e ações a preencher`, status: 'A preencher', ano: 'Base local pendente', tipo: 'individual', desc: 'Espaço reservado para inserir ações judiciais, teses administrativas, precedentes, prazos e observações específicas desta instituição.', base: 'Preencher com lei estadual/distrital, edital, estatuto, jurisprudência e documentos funcionais.', fonte: 'Fonte oficial a preencher', fonteUrl: '', atualizado: 'Estrutura criada para preenchimento' },
    { titulo: `${info.titulo} — Remuneração, adicionais e rubricas`, status: 'Verificar caso a caso', ano: 'Tema permanente', tipo: 'individual', desc: 'Use este item para detalhar adicionais, gratificações, auxílio-alimentação, insalubridade, periculosidade, serviço extraordinário, plantões e eventuais diferenças.', base: 'Tabela remuneratória, contracheque, laudo, escala, ato de designação e legislação local.', fonte: 'Documentos funcionais e normas locais', fonteUrl: '', atualizado: 'Estrutura criada para preenchimento' },
    { titulo: `${info.titulo} — Aposentadoria, reserva, reforma e previdência`, status: 'Análise individual', ano: 'Regra local a preencher', tipo: 'individual', desc: 'Espaço para regras previdenciárias, transições, paridade/integralidade quando aplicável, abono de permanência e regras próprias da carreira.', base: 'Data de ingresso, tempo de contribuição, cargo/carreira, sexo, idade, regime previdenciário e norma local.', fonte: 'Conferência previdenciária individual', fonteUrl: '', atualizado: 'Estrutura criada para preenchimento' }
  ];
}

function criarAssociacoesEstrutura(info, estadoNome) {
  return [
    { nome: `Associação/Sindicato — ${info.titulo}`, foco: `${estadoNome} — ${info.desc}`, acao: 'Espaço reservado para cadastrar entidade representativa, atuação institucional, pautas remuneratórias, previdenciárias e jurídicas da carreira.', site: 'Consultar site oficial da entidade local', telefone: 'Consultar diretamente', mensalidade: 'Consultar diretamente', servicos: 'Jurídico, comunicação institucional, convênios, assembleias, atendimento ao associado e acompanhamento legislativo — preencher conforme entidade.' },
    { nome: `Entidade representativa estadual — ${estadoNome}`, foco: `Profissionais ativos, inativos e pensionistas vinculados à ${info.titulo}`, acao: 'Cadastrar aqui associações, sindicatos, clubes e entidades de classe existentes na unidade federativa.', site: 'Consultar canais oficiais', telefone: 'Consultar diretamente', mensalidade: 'Consultar diretamente', servicos: 'Serviços a preencher conforme entidade.' }
  ];
}


/* ============================================================ */
/* === ESTRUTURA-BASE PARA INSTITUIÇÕES FEDERAIS =============== */
/* ============================================================ */
const INSTITUICOES_FEDERAIS_ESTRUTURA = [
  { inst: 'pf', titulo: 'PF', desc: 'Polícia Federal', tipo: 'Polícia Federal', cor: '#1f4f7a' },
  { inst: 'prf', titulo: 'PRF', desc: 'Polícia Rodoviária Federal', tipo: 'Polícia Rodoviária Federal', cor: '#1f5f8a' },
  { inst: 'pcdf', titulo: 'PCDF', desc: 'Polícia Civil do Distrito Federal', tipo: 'Polícia Civil', cor: '#4b5563' }
];

function criarResumoFederalEstrutura(item) {
  if (item.inst === 'pf') {
    return {
      nome: 'Polícia Federal',
      sigla: 'PF',
      siglaInterna: 'PF',
      estado: 'Brasil',
      estadoSigla: 'BR',
      tipo: 'Polícia Federal / Polícia Judiciária da União',
      criacao: 'Órgão permanente de segurança pública federal — art. 144, §1º, da Constituição Federal; carreira reorganizada pela Lei nº 9.266/1996',
      ativa: 15700,
      ativaLabel: '≈ 15,7 mil servidores ativos — estimativa pública de ordem de grandeza com base no eGP/PF 2025 T4 e no PEP/MGI; não expõe lotação nem distribuição sensível',
      reserva: 9000,
      reservaLabel: '≈ 9 mil vínculos de aposentados e pensionistas — estimativa orientativa para a aba institucional; conferir PEP/Portal da Transparência antes de uso administrativo',
      femininas: 3000,
      femininasLabel: '≈ 3 mil mulheres no quadro ativo/institucional — estimativa conservadora para dar noção ao usuário; recorte exato por sexo deve ser conferido no PEP/MGI',
      efetivoTotalLabel: '≈ 15,7 mil ativos em base pública 2025 T4; recomposição autorizada em 2026 pode elevar a ordem de grandeza para a faixa de 16,7–17,7 mil após formação, nomeação e posse',
      populacao: 213400000,
      populacaoTitulo: 'População estimada do Brasil em 2025 — IBGE',
      populacaoLabel: '213,4 milhões de habitantes — abrangência nacional',
      relacaoLabel: '≈ 1 servidor ativo da PF para cada 13,6 mil habitantes',
      relacaoTitulo: 'Razão estimada: população nacional de 213,4 milhões ÷ cerca de 15,7 mil servidores ativos; usar como noção de escala, não como indicador operacional de policiamento ostensivo',
      governador: 'Presidência da República / Ministério da Justiça e Segurança Pública',
      comando: 'Andrei Augusto Passos Rodrigues — Diretor-Geral da Polícia Federal',
      estrutura: 'Diretoria-Geral, Gabinete, DIREX, DPA, DICOR, DAMAZ, DCIBER, DCI, DIP, DITEC, DGP, DIREN-ANP, DLOG, DTI, DPP, COGER e Superintendências Regionais, conforme estrutura institucional publicada pela PF.',
      sede: 'Brasília/DF — Diretoria-Geral da Polícia Federal',
      emergencia: 'Atendimento institucional; contato da Direção-Geral: (61) 2024-8000',
      linksOficiais: [
        'https://www.gov.br/pf/pt-br',
        'https://www.gov.br/pf/pt-br/acesso-a-informacao/institucional/competencias',
        'https://www.gov.br/pf/pt-br/acesso-a-informacao/institucional/estruturas',
        'https://www.gov.br/pf/pt-br/composicao/direcao-geral/dg',
        'https://www.gov.br/pf/pt-br/acesso-a-informacao/servidores/servidores-ativos',
        'https://www.gov.br/pf/pt-br/acesso-a-informacao/servidores/concursos',
        'https://www.gov.br/servidor/pt-br/observatorio-de-pessoal-govbr/painel-estatistico-de-pessoal'
      ],
      fonte: 'Polícia Federal/Gov.br; Constituição Federal art. 144; Lei nº 9.266/1996; Lei nº 11.358/2006; Lei nº 14.875/2024, Anexo XXVI; Decreto nº 11.348/2023; Portaria MJSP nº 1.112/2025; PEP/MGI; eGP/PF Dados Abertos 2025 T4; Portal da Transparência; IBGE; Cebraspe/PF 2025',
      atualizado: 'PF revisada em 06/05/2026 — remuneração 2026 detalhada; efetivo e recortes populacionais exibidos como estimativas identificadas, com cautela de conferência PEP/MGI'
    };
  }

  if (item.inst === 'prf') {
    return {
      nome: 'Polícia Rodoviária Federal',
      sigla: 'PRF',
      estado: 'Brasil',
      estadoSigla: 'BR',
      tipo: 'Polícia Rodoviária Federal',
      criacao: '24/07/1928 · Polícia das Estradas · origem histórica da PRF',
      ativa: 13000,
      ativaLabel: '13.000+ servidores ativos · PRF/Rotas de Integração 2025',
      reserva: 0,
      reservaLabel: 'Dados em breve · aposentados/pensionistas não consolidados nesta revisão',
      femininas: 0,
      femininasLabel: 'Dados em breve · recorte feminino não consolidado em fonte oficial nesta revisão',
      efetivoTotalLabel: '27 Superintendências · 152 Delegacias · cerca de 500 Unidades Operacionais',
      populacao: 75000,
      populacaoTitulo: 'Rodovias federais fiscalizadas',
      populacaoLabel: '75 mil km de rodovias federais em todos os estados e no DF',
      relacaoLabel: '≈1 servidor ativo / 5,8 km de rodovia federal',
      relacaoTitulo: 'Cobertura operacional estimada',
      governador: 'Presidência da República / Ministério da Justiça e Segurança Pública',
      comando: 'Antônio Fernando Souza Oliveira — Diretor-Geral da PRF',
      estrutura: 'Órgão permanente de segurança pública federal, presente nos 26 estados e no Distrito Federal, com 27 Superintendências, 152 Delegacias e cerca de 500 Unidades Operacionais.',
      sede: 'SPO, Qd 03, Lt. 05, Complexo Sede da PRF — Brasília/DF — CEP 70610-909',
      emergencia: '191',
      linksOficiais: [
        'https://www.gov.br/prf/pt-br',
        'https://www.gov.br/prf/pt-br/acesso-a-informacao/institucional',
        'https://www.gov.br/prf/pt-br/acesso-a-informacao/servidores/carreira-prf',
        'https://www.gov.br/prf/pt-br/servicos/concurso-prf-2021'
      ],
      fonte: 'PRF/Gov.br; documento PRF Rotas de Integração 2025; Câmara dos Deputados — Lei nº 14.875/2024, Anexo XXVII; PRF Direção-Geral; Cebraspe/PRF 2021',
      atualizado: 'PRF revisada em 04/05/2026 — números exatos não inferidos quando a fonte oficial não consolida o recorte'
    };
  }

  return {
    nome: item.desc,
    sigla: item.titulo,
    estado: 'Brasil',
    estadoSigla: 'BR',
    tipo: item.tipo,
    criacao: 'A preencher',
    ativa: 0,
    ativaLabel: 'Efetivo ativo — preencher',
    reserva: 0,
    reservaLabel: 'Aposentados/inativos — preencher',
    femininas: 0,
    femininasLabel: 'Integrantes femininas — preencher',
    populacao: 0,
    populacaoTitulo: 'Abrangência nacional',
    relacaoLabel: 'Relação por habitante/rodovia/atribuição — preencher',
    relacaoTitulo: 'Relação institucional',
    governador: 'Governo Federal / Ministério responsável — preencher',
    comando: 'Direção-Geral atual — preencher',
    fonte: 'Fontes oficiais federais — preencher',
    atualizado: 'Estrutura criada para preenchimento'
  };
}

function criarCargosPfEstrutura(inst, sigla) {
  if (typeof CARGOS_PF !== 'undefined' && Array.isArray(CARGOS_PF) && CARGOS_PF.length) return CARGOS_PF;
  const fonteKey = 'pf';
  const criterio = 'Subsídio federal da carreira policial federal, valores com efeitos a partir de 01/05/2026 conforme Lei nº 14.875/2024, Anexo XXVI, e Tabela de Remuneração dos Servidores Públicos Federais Civis nº 87/2026.';
  const benefDesc = 'Benefícios não somados ao subsídio: auxílio-alimentação R$ 1.192,00; assistência pré-escolar R$ 526,64 quando devida; assistência à saúde suplementar por faixa etária/remuneração; indenização de fronteira R$ 91,00 por dia quando houver exercício em localidade prevista; diárias, ajuda de custo, transporte, adicional de férias e gratificação natalina conforme legislação.';
  return [
    { val: 'delegado_perito_especial_pf', id: 'delegado_perito_especial_pf', text: `${sigla} — Delegado/Perito Criminal Federal — Classe Especial`, nome: `${sigla} — Delegado/Perito Criminal Federal — Classe Especial`, padrao: 41350.00, oficial: true, fonteKey, criterio, benefDesc, badge: 'Federal 2026' },
    { val: 'delegado_perito_primeira_pf', id: 'delegado_perito_primeira_pf', text: `${sigla} — Delegado/Perito Criminal Federal — 1ª Classe`, nome: `${sigla} — Delegado/Perito Criminal Federal — 1ª Classe`, padrao: 35377.35, oficial: true, fonteKey, criterio, benefDesc, badge: 'Federal 2026' },
    { val: 'delegado_perito_segunda_pf', id: 'delegado_perito_segunda_pf', text: `${sigla} — Delegado/Perito Criminal Federal — 2ª Classe`, nome: `${sigla} — Delegado/Perito Criminal Federal — 2ª Classe`, padrao: 30869.46, oficial: true, fonteKey, criterio, benefDesc, badge: 'Federal 2026' },
    { val: 'delegado_perito_terceira_pf', id: 'delegado_perito_terceira_pf', text: `${sigla} — Delegado/Perito Criminal Federal — 3ª Classe`, nome: `${sigla} — Delegado/Perito Criminal Federal — 3ª Classe`, padrao: 27831.70, oficial: true, fonteKey, criterio, benefDesc, badge: 'Federal 2026' },
    { val: 'agente_escrivao_papilo_especial_pf', id: 'agente_escrivao_papilo_especial_pf', text: `${sigla} — Agente/Escrivão/Papiloscopista — Classe Especial`, nome: `${sigla} — Agente/Escrivão/Papiloscopista — Classe Especial`, padrao: 25250.00, oficial: true, fonteKey, criterio, benefDesc, badge: 'Federal 2026' },
    { val: 'agente_escrivao_papilo_primeira_pf', id: 'agente_escrivao_papilo_primeira_pf', text: `${sigla} — Agente/Escrivão/Papiloscopista — 1ª Classe`, nome: `${sigla} — Agente/Escrivão/Papiloscopista — 1ª Classe`, padrao: 19617.37, oficial: true, fonteKey, criterio, benefDesc, badge: 'Federal 2026' },
    { val: 'agente_escrivao_papilo_segunda_pf', id: 'agente_escrivao_papilo_segunda_pf', text: `${sigla} — Agente/Escrivão/Papiloscopista — 2ª Classe`, nome: `${sigla} — Agente/Escrivão/Papiloscopista — 2ª Classe`, padrao: 16761.16, oficial: true, fonteKey, criterio, benefDesc, badge: 'Federal 2026' },
    { val: 'agente_escrivao_papilo_terceira_pf', id: 'agente_escrivao_papilo_terceira_pf', text: `${sigla} — Agente/Escrivão/Papiloscopista — 3ª Classe`, nome: `${sigla} — Agente/Escrivão/Papiloscopista — 3ª Classe`, padrao: 14710.10, oficial: true, selected: true, fonteKey, criterio, benefDesc, badge: 'Federal 2026' }
  ];
}

function criarCargosPrfEstrutura(inst, sigla) {
  const fonteKey = 'prf';
  const criterio = 'Subsídio federal da carreira de Policial Rodoviário Federal, efeitos financeiros a partir de 01/05/2026, conforme Lei nº 14.875/2024, Anexo XXVII, que alterou o Anexo III da Lei nº 11.358/2006.';
  const benefDesc = 'Benefícios não somados ao subsídio: auxílio-alimentação federal, assistência à saúde suplementar por faixa, auxílio pré-escolar quando devido, indenização de fronteira quando houver exercício em localidade prevista, diárias, ajuda de custo, transporte, adicional de férias, gratificação natalina e demais rubricas funcionais conforme legislação e situação individual.';
  const linhas = [
    ['especial_iii', 'Policial Rodoviário Federal — Classe Especial — Padrão III', 23000.00],
    ['especial_ii', 'Policial Rodoviário Federal — Classe Especial — Padrão II', 22249.43],
    ['especial_i', 'Policial Rodoviário Federal — Classe Especial — Padrão I', 21524.32],
    ['primeira_vi', 'Policial Rodoviário Federal — 1ª Classe — Padrão VI', 20306.21],
    ['primeira_v', 'Policial Rodoviário Federal — 1ª Classe — Padrão V', 19649.56],
    ['primeira_iv', 'Policial Rodoviário Federal — 1ª Classe — Padrão IV', 19015.88],
    ['primeira_iii', 'Policial Rodoviário Federal — 1ª Classe — Padrão III', 18404.39],
    ['primeira_ii', 'Policial Rodoviário Federal — 1ª Classe — Padrão II', 17814.28],
    ['primeira_i', 'Policial Rodoviário Federal — 1ª Classe — Padrão I', 17244.77],
    ['segunda_vi', 'Policial Rodoviário Federal — 2ª Classe — Padrão VI', 15949.32],
    ['segunda_v', 'Policial Rodoviário Federal — 2ª Classe — Padrão V', 15704.54],
    ['segunda_iv', 'Policial Rodoviário Federal — 2ª Classe — Padrão IV', 15463.72],
    ['segunda_iii', 'Policial Rodoviário Federal — 2ª Classe — Padrão III', 15226.76],
    ['segunda_ii', 'Policial Rodoviário Federal — 2ª Classe — Padrão II', 14993.63],
    ['segunda_i', 'Policial Rodoviário Federal — 2ª Classe — Padrão I', 14764.25],
    ['terceira_iii', 'Policial Rodoviário Federal — 3ª Classe — Padrão III', 12630.98],
    ['terceira_ii', 'Policial Rodoviário Federal — 3ª Classe — Padrão II', 12440.90],
    ['terceira_i', 'Policial Rodoviário Federal — 3ª Classe — Padrão I', 12253.84]
  ];
  return linhas.map(([id, nome, padrao], idx) => ({
    id,
    val: `${id}_${inst}`,
    text: `${sigla} — ${nome}`,
    nome: `${sigla} — ${nome}`,
    padrao,
    gratif: 0,
    oficial: true,
    selected: idx === linhas.length - 1,
    retpFator: 0,
    fonteKey,
    criterio,
    benefDesc,
    badge: 'Federal 2026'
  }));
}

function criarConcursoFederalEstrutura(item) {
  if (item.inst === 'prf') {
    return {
      edital: 'PRF — Concurso Policial Rodoviário Federal 2021 · 1.500 vagas · validade prorrogada até junho/2026',
      salario: 'Inicial 2026: R$ 12.253,84 · Classe 3ª, Padrão I; final da carreira: R$ 23.000,00 · Classe Especial III.',
      vagas: '1.500 vagas no concurso PRF 2021; 521 nomeações em 2025 e posse coletiva de aproximadamente 300 profissionais em janeiro/2026.',
      cotas: 'Regras federais de cotas e edital Cebraspe/PRF 2021.',
      idade: 'CNH categoria B ou superior; requisitos físicos, médicos, psicológicos, investigação social e demais condições do edital.',
      escolaridade: 'Nível superior completo em qualquer área, conforme carreira de Policial Rodoviário Federal.',
      banca: 'Cebraspe',
      inscritos: '304 mil+ inscritos · referência concurso PRF 2021/Cebraspe',
      materias: 'Língua Portuguesa, Raciocínio Lógico, Informática, Física, Ética, Geopolítica, Língua Estrangeira, legislação de trânsito, Direito Constitucional, Administrativo, Penal, Processo Penal, Direitos Humanos e legislação especial.',
      etapas: 'Provas objetiva e discursiva, TAF, avaliação psicológica, avaliação de saúde, investigação social, avaliação biopsicossocial/heteroidentificação quando aplicável, curso de formação profissional e nomeação.',
      cfsd: 'Curso de Formação Policial na UniPRF; novas turmas em 2025/2026 reforçaram efetivo em áreas estratégicas.',
      estagio: 'Estágio probatório e desenvolvimento na carreira conforme Lei nº 9.654/1998, Decreto nº 8.282/2014 e normas federais.',
      validade: 'Concurso PRF 2021 prorrogado até junho/2026.',
      previsao: 'Novo concurso solicitado/anunciado em estudos; sem edital novo publicado até a referência desta atualização.',
      site: 'https://www.gov.br/prf/pt-br/acesso-a-informacao/servidores/concursos'
    };
  }

  if (item.inst === 'pf') {
    return {
      edital: 'PF — Concurso Público 2025 para a Carreira Policial Federal · Cebraspe · Edital nº 1/2025',
      salario: 'Inicial 2026: Delegado/Perito Criminal Federal R$ 27.831,70; Agente, Escrivão e Papiloscopista R$ 14.710,10. Final da carreira 2026: Delegado/Perito R$ 41.350,00; Agente/Escrivão/Papiloscopista R$ 25.250,00.',
      vagas: '1.000 vagas: Delegado 120, Perito Criminal Federal 69, Agente 630, Escrivão 160 e Papiloscopista 21. Em 22/04/2026, o Governo Federal autorizou a nomeação de 1.000 aprovados excedentes; mais de 600 candidatos de Agente estavam em formação na ANP em abril/2026.',
      cotas: 'Reservas federais do edital: pessoas negras, pessoas com deficiência e demais hipóteses legais aplicáveis ao concurso público federal.',
      idade: 'Requisitos gerais do edital: 18 anos completos na posse, aptidão física e mental, investigação social, CNH categoria B ou superior quando exigida e cumprimento das demais condições por cargo.',
      escolaridade: 'Nível superior. Delegado: bacharelado em Direito e 3 anos de atividade jurídica ou policial. Perito: diploma na área específica. Agente, Escrivão e Papiloscopista: nível superior em qualquer área.',
      banca: 'Cebraspe',
      inscritos: '218.821 inscritos no total: Agente 137.645, Escrivão 26.666, Delegado 20.533, Papiloscopista 6.582 e Perito Criminal Federal por área, conforme demanda Cebraspe/PF 2025.',
      materias: 'Provas objetiva e discursiva por cargo, com disciplinas de Língua Portuguesa, Direito Constitucional, Administrativo, Penal e Processo Penal, legislação especial, raciocínio lógico/estatística/contabilidade/informática e conhecimentos específicos quando previstos.',
      etapas: 'Provas objetiva e discursiva, exame de aptidão física, avaliação médica, avaliação psicológica, investigação social, avaliação biopsicossocial e heteroidentificação quando aplicável, prova oral para Delegado, avaliação de títulos para Delegado e Perito e Curso de Formação Profissional.',
      cfsd: 'Curso de Formação Profissional na Academia Nacional de Polícia. Em abril/2026 havia mais de 600 candidatos de Agente em formação.',
      estagio: 'Estágio probatório, progressão e promoção conforme Lei nº 9.266/1996, Lei nº 11.358/2006, Lei nº 8.112/1990, Lei nº 4.878/1965 e normas internas da Polícia Federal.',
      validade: 'Concurso PF 2025 em andamento em 03/05/2026, com provas aplicadas em 27/07/2025 e atos de formação/nomeação em 2026.',
      previsao: 'Há certame policial 2025 em andamento e autorização de 1.000 excedentes em 2026; novo edital depende de ato oficial no DOU, PF ou Cebraspe.',
      site: 'https://www.gov.br/pf/pt-br/acesso-a-informacao/servidores/concursos'
    };
  }

  return {
    edital: `${item.titulo} — ${item.desc} — estrutura de concurso a preencher`,
    salario: 'A confirmar em edital, tabela oficial federal ou Diário Oficial da União.',
    vagas: 'Preencher com edital/autorização vigente.',
    cotas: 'Preencher conforme legislação federal e edital.',
    idade: 'Preencher requisitos de idade, CNH, aptidão física, investigação social e demais exigências conforme edital.',
    escolaridade: 'Preencher escolaridade e requisitos do cargo conforme edital.',
    banca: 'A definir/preencher conforme edital.',
    inscritos: 'Preencher quando houver dado oficial.',
    materias: 'Preencher disciplinas conforme edital do cargo.',
    etapas: 'Prova objetiva/discursiva quando prevista, TAF, exames médicos, avaliação psicológica, investigação social, curso de formação profissional e demais etapas do edital.',
    cfsd: 'Curso de formação profissional — preencher conforme edital e academia responsável.',
    estagio: 'Estágio probatório e desenvolvimento na carreira — preencher conforme legislação federal.',
    validade: 'Preencher conforme edital e atos de homologação/prorrogação.',
    previsao: 'Acompanhar Diário Oficial da União, órgão oficial e banca. Não afirmar concurso aberto sem publicação oficial.',
    site: '#'
  };
}

function criarAcoesFederalEstrutura(item) {
  if (item.inst === 'prf') {
    return [
      { titulo: 'PRF — subsídio 2026, enquadramento e progressão', status: 'Tema permanente', ano: 'Lei 9.654/1998 · Lei 14.875/2024', tipo: 'individual/coletivo', desc: 'Conferência de classe e padrão da carreira de Policial Rodoviário Federal, progressão, promoção e aplicação do subsídio federal vigente em 2026.', base: 'Lei nº 9.654/1998, Lei nº 12.775/2012, Decreto nº 8.282/2014, Lei nº 14.875/2024 e tabela federal/MGI 2026.', fonte: 'PRF/MGI/Planalto', fonteUrl: 'https://www.gov.br/prf/pt-br/acesso-a-informacao/servidores/carreira-prf', atualizado: 'Maio/2026' },
      { titulo: 'PRF — adicional de fronteira, diárias e indenizações', status: 'Depende de lotação/escala', ano: 'Tema recorrente', tipo: 'individual', desc: 'Conferência de adicional de fronteira, diárias, indenizações, ajuda de custo, missões, deslocamentos, escalas e demais rubricas eventuais.', base: 'Lei nº 12.855/2013, portarias federais, escala, lotação, Sigepe/SouGov e ficha financeira.', fonte: 'Planalto/MGI/PRF', fonteUrl: 'https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/lei/l12855.htm', atualizado: 'Maio/2026' },
      { titulo: 'PRF — aposentadoria policial, integralidade, paridade e abono', status: 'Análise previdenciária', ano: 'EC 103/2019', tipo: 'individual', desc: 'Aplicação das regras de aposentadoria policial federal, transições, paridade/integralidade quando cabíveis, contribuição previdenciária e abono de permanência.', base: 'Constituição Federal, EC 103/2019, LC 51/1985, Lei Complementar 144/2014, Lei 9.654/1998 e histórico funcional.', fonte: 'Planalto/MGI/PRF', fonteUrl: 'https://www.gov.br/prf/pt-br/acesso-a-informacao/servidores', atualizado: 'Maio/2026' }
    ];
  }

  if (item.inst === 'pf') {
    return [
      { titulo: 'PF — subsídio 2026, classe, padrão e desenvolvimento na carreira', status: 'Vigente em 2026', ano: 'Lei 14.875/2024 · Lei 11.358/2006 · Lei 9.266/1996', tipo: 'individual/coletivo', desc: 'Conferência de classe, padrão, cargo e aplicação do subsídio federal vigente em 2026 para Delegado, Perito, Agente, Escrivão e Papiloscopista da Polícia Federal.', base: 'Lei nº 14.875/2024, Lei nº 11.358/2006, Lei nº 9.266/1996, Lei nº 8.112/1990 e tabela remuneratória MGI nº 87/2026.', fonte: 'MGI/Servidor, Planalto e Polícia Federal', fonteUrl: 'https://www.gov.br/servidor/pt-br/observatorio-de-pessoal-govbr/tabela-de-remuneracao-dos-servidores-publicos-federais-civis-e-dos-ex-territorios', atualizado: 'Maio/2026' },
      { titulo: 'PF — indenização de fronteira, diárias e ajudas de custo', status: 'Depende da lotação e do exercício efetivo', ano: 'Lei 12.855/2013', tipo: 'individual', desc: 'Indenização de fronteira de R$ 91,00 por dia de efetivo trabalho em localidades estratégicas definidas em ato do Poder Executivo, além de diárias, ajuda de custo, transporte e indenizações por deslocamento quando cabíveis.', base: 'Lei nº 12.855/2013, normas de diárias/ajuda de custo, ato de lotação, escala, missão e registro funcional.', fonte: 'Planalto/MGI/PF', fonteUrl: 'https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/lei/l12855.htm', atualizado: 'Maio/2026' },
      { titulo: 'PF — benefícios federais: alimentação, pré-escolar e saúde suplementar', status: 'Valores federais 2026', ano: 'Portaria MGI nº 2.756/2026 e normas correlatas', tipo: 'individual', desc: 'Auxílio-alimentação federal de R$ 1.192,00; assistência pré-escolar de R$ 526,64 quando devida; assistência à saúde suplementar por faixa etária e remuneração, com valores definidos pelo MGI.', base: 'Portarias do MGI, regras do SIAPE/SouGov, dependentes cadastrados e comprovação de plano de saúde quando exigida.', fonte: 'Ministério da Gestão e da Inovação em Serviços Públicos', fonteUrl: 'https://www.gov.br/gestao/pt-br/assuntos/noticias/2026/abril/governo-reajusta-beneficios-de-auxilio-a-saude-e-assistencia-pre-escolar-dos-servidores-federais', atualizado: 'Abril/2026' },
      { titulo: 'PF — aposentadoria policial, abono de permanência e regras de transição', status: 'Regra previdenciária federal', ano: 'EC 103/2019 · LC 51/1985 · LC 144/2014', tipo: 'individual', desc: 'Aplicação das regras de aposentadoria policial federal, transições, paridade/integralidade quando cabíveis, contribuição previdenciária e abono de permanência conforme data de ingresso e histórico funcional.', base: 'Constituição Federal, EC nº 103/2019, LC nº 51/1985, LC nº 144/2014, Lei nº 8.112/1990, cargo, sexo, idade, tempo de contribuição e ficha funcional.', fonte: 'Planalto/MGI/PF', fonteUrl: 'https://www.planalto.gov.br/ccivil_03/constituicao/emendas/emc/emc103.htm', atualizado: 'Maio/2026' }
    ];
  }

  return [
    { titulo: `${item.titulo} — Estrutura de direitos e ações a preencher`, status: 'A preencher', ano: 'Base federal pendente', tipo: 'individual', desc: 'Espaço reservado para inserir ações judiciais, teses administrativas, precedentes, prazos e observações específicas desta instituição federal.', base: 'Preencher com lei federal, edital, estatuto, jurisprudência, atos administrativos e documentos funcionais.', fonte: 'Fonte oficial a preencher', fonteUrl: '', atualizado: 'Estrutura criada para preenchimento' },
    { titulo: `${item.titulo} — Remuneração, adicionais e indenizações`, status: 'Verificar caso a caso', ano: 'Tema permanente', tipo: 'individual', desc: 'Use este item para detalhar subsídio/vencimento, indenizações, adicionais, auxílio-alimentação, adicional de fronteira, plantões, serviço extraordinário e eventuais diferenças.', base: 'Tabela remuneratória federal, contracheque, escala, portaria, ato de designação e legislação aplicável.', fonte: 'Documentos funcionais e normas federais', fonteUrl: '', atualizado: 'Estrutura criada para preenchimento' },
    { titulo: `${item.titulo} — Aposentadoria policial e previdência`, status: 'Análise individual', ano: 'Regra federal a preencher', tipo: 'individual', desc: 'Espaço para regras previdenciárias, transições, paridade/integralidade quando aplicável, abono de permanência e regras próprias da carreira policial federal.', base: 'Data de ingresso, tempo de contribuição, cargo/carreira, sexo, idade, regime previdenciário e norma federal.', fonte: 'Conferência previdenciária individual', fonteUrl: '', atualizado: 'Estrutura criada para preenchimento' }
  ];
}

function criarAssociacoesFederalEstrutura(item) {
  if (item.inst === 'prf') {
    return [
      { nome: 'FenaPRF — Federação Nacional dos Policiais Rodoviários Federais', foco: 'Policiais rodoviários federais ativos, aposentados e pensionistas', acao: 'Representação nacional da categoria, negociação coletiva, defesa institucional, previdência, saúde, segurança do trabalho e pautas remuneratórias.', site: 'https://fenaprf.org.br', telefone: 'Consultar canais oficiais da federação', mensalidade: 'Conforme sindicato estadual/filiado', servicos: 'Notícias da carreira, representação nacional, articulação legislativa, convênios e orientação institucional.' },
      { nome: 'SINPRFs — Sindicatos estaduais dos Policiais Rodoviários Federais', foco: 'Policiais rodoviários federais por unidade da federação', acao: 'Representação regional, atendimento jurídico/administrativo, acompanhamento de escalas, lotação, remoção, saúde, remuneração e aposentadoria.', site: 'Consultar sindicato estadual da base', telefone: 'Consultar diretamente no sindicato local', mensalidade: 'Conforme regra de filiação', servicos: 'Atendimento sindical, jurídico, convênios, assembleias, comunicação e apoio ao associado.' },
      { nome: 'Associações e entidades regionais da PRF', foco: 'Servidores PRF, familiares, aposentados e pensionistas', acao: 'Apoio associativo complementar, comunicação de classe, benefícios, atividades sociais e acompanhamento de pautas locais.', site: 'Consultar entidade regional', telefone: 'Consultar diretamente', mensalidade: 'Conforme entidade', servicos: 'Convênios, apoio social, comunicação institucional e suporte associativo.' }
    ];
  }

  if (item.inst === 'pf') {
    return [
      { nome: 'FENAPEF — Federação Nacional dos Policiais Federais', foco: 'Agentes, Escrivães, Papiloscopistas e demais policiais federais representados por sindicatos filiados', acao: 'Representação nacional da categoria, negociação institucional, acompanhamento legislativo, defesa de direitos, previdência, saúde e valorização profissional.', site: 'https://fenapef.org.br', telefone: 'Canais oficiais da federação', mensalidade: 'Conforme sindicato filiado', servicos: 'Notícias da carreira, representação nacional, articulação legislativa, apoio sindical e comunicação institucional.' },
      { nome: 'ADPF — Associação Nacional dos Delegados de Polícia Federal', foco: 'Delegados de Polícia Federal', acao: 'Representação associativa nacional, defesa institucional da carreira de Delegado, acompanhamento legislativo, prerrogativas, previdência e comunicação institucional.', site: 'https://www.adpf.org.br', telefone: 'Canais oficiais da associação', mensalidade: 'Regra de filiação da entidade', servicos: 'Representação institucional, notícias, eventos, articulação legislativa e apoio ao associado.' },
      { nome: 'APCF — Associação Nacional dos Peritos Criminais Federais', foco: 'Peritos Criminais Federais', acao: 'Representação associativa da perícia criminal federal, defesa de prerrogativas, produção técnica, comunicação institucional e acompanhamento de pautas legislativas.', site: 'https://www.apcf.org.br', telefone: 'Canais oficiais da associação', mensalidade: 'Regra de filiação da entidade', servicos: 'Representação da perícia, notícias técnicas, eventos, comunicação e apoio institucional.' },
      { nome: 'SINPEFs — Sindicatos dos Policiais Federais nos estados', foco: 'Policiais federais ativos, aposentados e pensionistas por unidade da federação', acao: 'Atendimento regional, apoio jurídico/administrativo, assembleias, convênios, comunicação sindical e acompanhamento de pautas locais.', site: 'https://fenapef.org.br', telefone: 'Canais oficiais do sindicato estadual', mensalidade: 'Conforme regra de filiação estadual', servicos: 'Atendimento sindical, jurídico, convênios, assembleias, comunicação e suporte ao filiado.' }
    ];
  }

  return [
    { nome: `Associação/Sindicato — ${item.titulo}`, foco: `Brasil — ${item.desc}`, acao: 'Espaço reservado para cadastrar entidade representativa, atuação institucional, pautas remuneratórias, previdenciárias e jurídicas da carreira.', site: 'Consultar site oficial da entidade nacional', telefone: 'Consultar diretamente', mensalidade: 'Consultar diretamente', servicos: 'Jurídico, comunicação institucional, convênios, assembleias, atendimento ao associado e acompanhamento legislativo — preencher conforme entidade.' },
    { nome: `Entidade representativa federal — ${item.titulo}`, foco: `Profissionais ativos, aposentados e pensionistas vinculados à ${item.desc}`, acao: 'Cadastrar aqui associações, sindicatos, clubes e entidades de classe nacionais/regionais existentes.', site: 'Consultar canais oficiais', telefone: 'Consultar diretamente', mensalidade: 'Consultar diretamente', servicos: 'Serviços a preencher conforme entidade.' }
  ];
}

function aplicarEstruturaFederaisDados() {
  HEADER_ESTADOS.br = {
    nome: 'Brasil',
    sigla: 'BR',
    pc: 'pf',
    pp: 'prf',
    pf: 'pf',
    prf: 'prf',
    flag: HEADER_BRASIL_FLAG
  };

  INSTITUICOES_FEDERAIS_ESTRUTURA.forEach(item => {
    if (!INSTITUICOES_VALIDAS.includes(item.inst)) INSTITUICOES_VALIDAS.push(item.inst);
    HEADER_INSTITUICOES_INFO[item.inst] = HEADER_INSTITUICOES_INFO[item.inst] || { titulo: item.titulo, desc: item.desc };
    HEADER_INSTITUICOES_RESUMO[item.inst] = HEADER_INSTITUICOES_RESUMO[item.inst] || criarResumoFederalEstrutura(item);
    if (item.inst === 'pf') {
      REMUNERACAO_FONTES_OFICIAIS[item.inst] = { nome: 'Lei nº 14.875/2024, Anexo XXVI — subsídio PF com efeitos em 01/05/2026; MGI/Gov.br — benefícios federais 2026; PF/Gov.br — servidores, estrutura e concursos', url: 'https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/lei/l14875.htm' };
    } else if (item.inst === 'prf') {
      REMUNERACAO_FONTES_OFICIAIS[item.inst] = { nome: 'Lei nº 14.875/2024, Anexo XXVII — subsídio PRF com efeitos em 01/05/2026; PRF/Gov.br — carreira e Portal da Transparência', url: 'https://www.gov.br/prf/pt-br/acesso-a-informacao/servidores/carreira-prf' };
    } else {
      REMUNERACAO_FONTES_OFICIAIS[item.inst] = REMUNERACAO_FONTES_OFICIAIS[item.inst] || { nome: `${item.titulo} — fonte oficial federal`, url: 'https://www.gov.br/servidor/pt-br/observatorio-de-pessoal-govbr/tabela-de-remuneracao-dos-servidores-publicos-federais-civis-e-dos-ex-territorios' };
    }

    if (item.inst === 'pf') {
      CONFIGS_INSTITUICOES_GENERICAS[item.inst] = {
        titulo: 'PF',
        desc: 'Polícia Federal',
        cor: item.cor,
        alertaPrev: 'PF: órgão federal permanente da segurança pública, polícia judiciária da União e atuação nacional em investigações federais, fronteiras, portos, aeroportos, migração, passaportes, armas, segurança privada, perícia criminal e cooperação internacional.'
      };
    } else if (item.inst === 'prf') {
      CONFIGS_INSTITUICOES_GENERICAS[item.inst] = {
        titulo: 'PRF',
        desc: 'Polícia Rodoviária Federal',
        cor: item.cor,
        alertaPrev: 'PRF/Federal: conferir contribuição ao RPPS, abono de permanência, assistência à saúde suplementar e rubricas no SouGov/contracheque. Não fixar desconto ou vantagem sem validar classe, padrão, lotação, missão e situação funcional.'
      };
    } else {
      CONFIGS_INSTITUICOES_GENERICAS[item.inst] = {
        titulo: item.titulo,
        desc: item.desc,
        cor: item.cor,
        alertaPrev: `${item.titulo}: órgão federal de segurança pública com dados institucionais organizados conforme fontes oficiais disponíveis.`
      };
    }
    CONCURSOS[item.inst] = CONCURSOS[item.inst] || criarConcursoFederalEstrutura(item);
    ACOES_JUDICIAIS[item.inst] = ACOES_JUDICIAIS[item.inst] || criarAcoesFederalEstrutura(item);
    ASSOCIACOES[item.inst] = ASSOCIACOES[item.inst] || criarAssociacoesFederalEstrutura(item);
    if (!CARGOS_ESTRUTURA_GENERICAS[item.inst]) {
      CARGOS_ESTRUTURA_GENERICAS[item.inst] = item.inst === 'pf'
        ? criarCargosPfEstrutura(item.inst, item.titulo)
        : criarCargosPrfEstrutura(item.inst, item.titulo);
    }
  });
}

function inserirOptionFederalNoSelect(select, item) {
  if (!select || Array.from(select.options || []).some(opt => opt.value === item.inst)) return;
  let grupo = Array.from(select.querySelectorAll('optgroup')).find(optgroup => optgroup.label === 'Federais');
  if (!grupo) {
    grupo = document.createElement('optgroup');
    grupo.label = 'Federais';
    select.appendChild(grupo);
  }
  grupo.appendChild(criarOptionInstituicao(item.inst, `${item.titulo} - ${item.desc}`));
}

function aplicarEstruturaFederaisNoHtml() {
  INSTITUICOES_FEDERAIS_ESTRUTURA.forEach(item => {
    ['instituicao_header', 'instituicao', 'instituicao_home'].forEach(id => inserirOptionFederalNoSelect(document.getElementById(id), item));
  });

  const flags = document.querySelector('.header-state-flags');
  if (flags && !flags.querySelector('[data-estado="br"]')) {
    const btn = document.createElement('button');
    btn.className = 'state-flag';
    btn.type = 'button';
    btn.dataset.estado = 'br';
    btn.title = 'Brasil / Instituições federais';
    btn.setAttribute('aria-label', 'Selecionar instituições federais');
    btn.setAttribute('aria-pressed', 'false');
    btn.onclick = () => selecionarEstado('br');
    btn.innerHTML = `<img src="${escapeHtml(HEADER_BRASIL_FLAG)}" alt="" aria-hidden="true"><span>BR</span>`;
    flags.appendChild(btn);
  }
}


const BOMBEIROS_MILITARES_ESTRUTURA = [
  { estado: 'ac', nome: 'Acre', sigla: 'AC', inst: 'bmac', titulo: 'BMAC', desc: 'Corpo de Bombeiros Militar do Acre' },
  { estado: 'al', nome: 'Alagoas', sigla: 'AL', inst: 'bmal', titulo: 'BMAL', desc: 'Corpo de Bombeiros Militar de Alagoas' },
  { estado: 'am', nome: 'Amazonas', sigla: 'AM', inst: 'bmam', titulo: 'BMAM', desc: 'Corpo de Bombeiros Militar do Amazonas' },
  { estado: 'ap', nome: 'Amapá', sigla: 'AP', inst: 'bmap', titulo: 'BMAP', desc: 'Corpo de Bombeiros Militar do Amapá' },
  { estado: 'ba', nome: 'Bahia', sigla: 'BA', inst: 'bmba', titulo: 'BMBA', desc: 'Corpo de Bombeiros Militar da Bahia' },
  { estado: 'ce', nome: 'Ceará', sigla: 'CE', inst: 'bmce', titulo: 'BMCE', desc: 'Corpo de Bombeiros Militar do Ceará' },
  { estado: 'df', nome: 'Distrito Federal', sigla: 'DF', inst: 'bmdf', titulo: 'BMDF', desc: 'Corpo de Bombeiros Militar do Distrito Federal' },
  { estado: 'es', nome: 'Espírito Santo', sigla: 'ES', inst: 'bmes', titulo: 'CBMES', desc: 'Corpo de Bombeiros Militar do Estado do Espírito Santo' },
  { estado: 'go', nome: 'Goiás', sigla: 'GO', inst: 'bmgo', titulo: 'BMGO', desc: 'Corpo de Bombeiros Militar do Estado de Goiás' },
  { estado: 'ma', nome: 'Maranhão', sigla: 'MA', inst: 'bmma', titulo: 'BMMA', desc: 'Corpo de Bombeiros Militar do Maranhão' },
  { estado: 'mg', nome: 'Minas Gerais', sigla: 'MG', inst: 'bmmg', titulo: 'CBMMG', desc: 'Corpo de Bombeiros Militar de Minas Gerais' },
  { estado: 'ms', nome: 'Mato Grosso do Sul', sigla: 'MS', inst: 'bmms', titulo: 'CBMMS', desc: 'Corpo de Bombeiros Militar de Mato Grosso do Sul' },
  { estado: 'mt', nome: 'Mato Grosso', sigla: 'MT', inst: 'bmmt', titulo: 'CBMMT', desc: 'Corpo de Bombeiros Militar do Estado de Mato Grosso' },
  { estado: 'pa', nome: 'Pará', sigla: 'PA', inst: 'bmpa', titulo: 'BMPA', desc: 'Corpo de Bombeiros Militar do Pará' },
  { estado: 'pb', nome: 'Paraíba', sigla: 'PB', inst: 'bmpb', titulo: 'BMPB', desc: 'Corpo de Bombeiros Militar da Paraíba' },
  { estado: 'pe', nome: 'Pernambuco', sigla: 'PE', inst: 'bmpe', titulo: 'BMPE', desc: 'Corpo de Bombeiros Militar de Pernambuco' },
  { estado: 'pi', nome: 'Piauí', sigla: 'PI', inst: 'bmpi', titulo: 'BMPI', desc: 'Corpo de Bombeiros Militar do Piauí' },
  { estado: 'pr', nome: 'Paraná', sigla: 'PR', inst: 'bmpr', titulo: 'CBMPR', desc: 'Corpo de Bombeiros Militar do Paraná' },
  { estado: 'rj', nome: 'Rio de Janeiro', sigla: 'RJ', inst: 'bmrj', titulo: 'CBMERJ', desc: 'Corpo de Bombeiros Militar do Estado do Rio de Janeiro' },
  { estado: 'rn', nome: 'Rio Grande do Norte', sigla: 'RN', inst: 'bmrn', titulo: 'BMRN', desc: 'Corpo de Bombeiros Militar do Rio Grande do Norte' },
  { estado: 'ro', nome: 'Rondônia', sigla: 'RO', inst: 'bmro', titulo: 'BMRO', desc: 'Corpo de Bombeiros Militar de Rondônia' },
  { estado: 'rr', nome: 'Roraima', sigla: 'RR', inst: 'bmrr', titulo: 'BMRR', desc: 'Corpo de Bombeiros Militar de Roraima' },
  { estado: 'rs', nome: 'Rio Grande do Sul', sigla: 'RS', inst: 'bmrs', titulo: 'BMRS', desc: 'Corpo de Bombeiros Militar do Rio Grande do Sul' },
  { estado: 'sc', nome: 'Santa Catarina', sigla: 'SC', inst: 'bmsc', titulo: 'BMSC', desc: 'Corpo de Bombeiros Militar de Santa Catarina' },
  { estado: 'se', nome: 'Sergipe', sigla: 'SE', inst: 'bmse', titulo: 'BMSE', desc: 'Corpo de Bombeiros Militar de Sergipe' },
  { estado: 'sp', nome: 'São Paulo', sigla: 'SP', inst: 'bmsp', titulo: 'CBPMESP', desc: 'Corpo de Bombeiros da Polícia Militar do Estado de São Paulo' },
  { estado: 'to', nome: 'Tocantins', sigla: 'TO', inst: 'bmto', titulo: 'BMTO', desc: 'Corpo de Bombeiros Militar do Tocantins' }
];

function criarResumoBombeiroEstrutura(estado, item) {
  return {
    nome: item.desc,
    sigla: item.titulo,
    estado: estado.nome || item.nome,
    estadoSigla: estado.sigla || item.sigla,
    tipo: 'Bombeiro Militar',
    criacao: 'A preencher',
    ativa: 0,
    ativaLabel: 'Efetivo ativo — preencher',
    reserva: 0,
    reservaLabel: 'Reserva/inativos — preencher',
    femininas: 0,
    femininasLabel: 'Integrantes femininas — preencher',
    populacao: 0,
    populacaoTitulo: 'População atendida',
    relacaoLabel: 'Relação ativo/população — preencher após informar efetivo',
    relacaoTitulo: 'Relação ativo/população',
    governador: 'Chefe do Executivo — preencher',
    comando: 'Comando-Geral do Corpo de Bombeiros — preencher',
    fonte: `Fontes oficiais do ${item.titulo}, Diário Oficial e portal de transparência de ${estado.nome || item.nome} — preencher`,
    atualizado: 'Estrutura de Bombeiros criada para preenchimento'
  };
}

function criarAcoesBombeiroEstrutura(info) {
  return [
    { titulo: `${info.titulo} — adicionais, gratificações e escalas`, status: 'A preencher', ano: 'Base local pendente', tipo: 'individual', desc: 'Espaço reservado para temas típicos de bombeiros militares: serviço operacional, sobreaviso/plantões, adicional de risco/insalubridade/periculosidade quando previsto, indenizações, diárias, fardamento e diferenças de escala.', base: 'Preencher com estatuto militar estadual, leis remuneratórias, boletins, escalas, laudos, contracheques e atos de designação.', fonte: 'Fonte oficial a preencher', fonteUrl: '', atualizado: 'Estrutura criada para preenchimento' },
    { titulo: `${info.titulo} — promoções, cursos e quadro militar`, status: 'Verificar caso a caso', ano: 'Tema permanente', tipo: 'individual', desc: 'Reservado para regras de promoção, interstício, cursos de formação/aperfeiçoamento/habilitação, antiguidade, merecimento e enquadramento no quadro de oficiais ou praças bombeiro militar.', base: 'Lei de organização básica, estatuto, regulamento de promoções e boletins internos.', fonte: 'Legislação e atos internos a preencher', fonteUrl: '', atualizado: 'Estrutura criada para preenchimento' },
    { titulo: `${info.titulo} — reserva, reforma e proteção social militar`, status: 'Análise individual', ano: 'Regra local a preencher', tipo: 'individual', desc: 'Espaço para regras de reserva remunerada, reforma, pensão militar, contribuição ao sistema de proteção social, paridade/integralidade quando cabível e averbações.', base: 'Data de ingresso, tempo militar, tempo de contribuição, posto/graduação, legislação estadual/distrital e documentos funcionais.', fonte: 'Conferência previdenciária individual', fonteUrl: '', atualizado: 'Estrutura criada para preenchimento' }
  ];
}

function criarAssociacoesBombeiroEstrutura(info, estadoNome) {
  return [
    { nome: `Associação de Bombeiros Militares — ${info.titulo}`, foco: `${estadoNome} — bombeiros militares ativos, inativos e pensionistas`, acao: 'Espaço reservado para entidade representativa da carreira bombeiro militar, pautas remuneratórias, previdenciárias, jurídicas e valorização profissional.', site: 'Consultar site oficial da entidade local', telefone: 'Consultar diretamente', mensalidade: 'Consultar diretamente', servicos: 'Jurídico, comunicação institucional, convênios, assembleias, atendimento ao associado e acompanhamento legislativo — preencher conforme entidade.' },
    { nome: `Entidade representativa militar estadual — ${estadoNome}`, foco: `Oficiais e praças vinculados ao ${info.titulo}`, acao: 'Cadastrar aqui associações, clubes, caixas beneficentes e entidades de classe que atendam bombeiros militares na unidade federativa.', site: 'Consultar canais oficiais', telefone: 'Consultar diretamente', mensalidade: 'Consultar diretamente', servicos: 'Serviços a preencher conforme entidade.' }
  ];
}

function aplicarEstruturaBombeirosMilitaresDados() {
  BOMBEIROS_MILITARES_ESTRUTURA.forEach(item => {
    const estado = HEADER_ESTADOS[item.estado] || { nome: item.nome, sigla: item.sigla, flag: HEADER_BRASIL_FLAG };
    const tituloBombeiro = String(item.titulo || item.inst || '').toUpperCase();
    item.titulo = tituloBombeiro;

    if (!HEADER_ESTADOS[item.estado]) HEADER_ESTADOS[item.estado] = estado;
    estado.bm = item.inst;

    if (!INSTITUICOES_VALIDAS.includes(item.inst)) INSTITUICOES_VALIDAS.push(item.inst);
    HEADER_INSTITUICOES_INFO[item.inst] = { titulo: tituloBombeiro, desc: item.desc };
    if (!HEADER_INSTITUICOES_RESUMO[item.inst]) HEADER_INSTITUICOES_RESUMO[item.inst] = criarResumoBombeiroEstrutura(estado, item);
    if (!REMUNERACAO_FONTES_OFICIAIS[item.inst]) {
      REMUNERACAO_FONTES_OFICIAIS[item.inst] = { nome: `${tituloBombeiro} — fonte oficial a preencher`, url: '#' };
    }
    CONFIGS_INSTITUICOES_GENERICAS[item.inst] = {
      titulo: tituloBombeiro,
      desc: item.desc,
      cor: '#b91c1c',
      alertaPrev: `${tituloBombeiro}: estrutura aberta para preenchimento. Conferir sistema de proteção social militar, remuneração, adicionais, auxílios, escalas, ingresso e direitos conforme legislação de ${estado.nome || item.nome}.`
    };
    CONCURSOS[item.inst] = CONCURSOS[item.inst] || criarConcursoEstrutura(item.inst, item, 'bm');
    ACOES_JUDICIAIS[item.inst] = ACOES_JUDICIAIS[item.inst] || criarAcoesBombeiroEstrutura(item);
    ASSOCIACOES[item.inst] = ASSOCIACOES[item.inst] || criarAssociacoesBombeiroEstrutura(item, estado.nome || item.nome);
    if (!CARGOS_ESTRUTURA_GENERICAS[item.inst]) CARGOS_ESTRUTURA_GENERICAS[item.inst] = criarCargosBombeiroEstrutura(item.inst, tituloBombeiro);
  });
}


function aplicarDadosEspecificosBmac() {
  const inst = 'bmac';
  if (HEADER_ESTADOS.ac) HEADER_ESTADOS.ac.bm = inst;
  if (!INSTITUICOES_VALIDAS.includes(inst)) INSTITUICOES_VALIDAS.push(inst);

  HEADER_INSTITUICOES_INFO[inst] = {
    titulo: 'BMAC',
    desc: 'Corpo de Bombeiros Militar do Acre'
  };

  HEADER_INSTITUICOES_RESUMO[inst] = {
    nome: 'Corpo de Bombeiros Militar do Acre',
    sigla: 'BMAC',
    siglaInterna: 'CBMAC',
    estado: 'Acre',
    estadoSigla: 'AC',
    tipo: 'Bombeiro Militar',
    criacao: '1974 · separação administrativa da PM em 1991',
    ativa: 689,
    ativaLabel: '≈ 690 militares ativos — estimativa de ordem de grandeza: efetivo oficial de 633 militares divulgado no balanço de 2024, acrescido da formatura de 56 novos soldados em 2025; conferir folha/portal de pessoal para número exato',
    reserva: 500,
    reservaLabel: '≈ 500 inativos/reserva — estimativa técnica para dar noção de grandeza; conferir Acreprevidência e demonstrativos oficiais antes de uso jurídico ou remuneratório',
    femininas: 120,
    femininasLabel: '≈ 120 mulheres — estimativa técnica com base em vagas femininas do concurso de aluno-soldado e composição histórica; não usar como quantitativo oficial fechado',
    populacao: 884372,
    populacaoLabel: '884.372 habitantes',
    populacaoTitulo: 'População estimada do Acre em 1º de julho de 2025, segundo IBGE',
    relacaoLabel: '≈ 1 militar ativo para cada 1,3 mil habitantes',
    relacaoTitulo: 'Relação estimada ativa/população: 884.372 habitantes ÷ ≈ 689 ativos',
    governador: 'Mailza Assis',
    comando: 'Cel QOBM Charles da Silva Santos — Comandante-Geral do CBMAC',
    estrutura: 'Comando-Geral em Rio Branco, nove unidades operacionais e três administrativas; atuação direta em Rio Branco, Epitaciolândia, Cruzeiro do Sul, Sena Madureira, Tarauacá, Feijó e Xapuri, com resposta operacional também em Bujari, Porto Acre, Senador Guiomard, Brasileia, Rodrigues Alves e Mâncio Lima, além de prontidão nos aeroportos de Rio Branco e Cruzeiro do Sul.',
    sede: 'Comando-Geral do CBMAC — Rio Branco/AC',
    emergencia: '193',
    fonte: 'Agência de Notícias do Acre; Portal do Estado do Acre; ALEAC; IBGE; SEAD/AC; IBFC',
    atualizado: 'BMAC revisado em 06/05/2026 — números de efetivo, reserva e mulheres exibidos como estimativas identificadas; remuneração detalhada por tabela PMAC/CBMAC'
  };

  REMUNERACAO_FONTES_OFICIAIS[inst] = {
    nome: 'Portal do Estado do Acre e ALEAC — tabela PMAC/CBMAC e leis dos militares estaduais; referência remuneratória de julho/2018 já cadastrada no portal',
    url: 'https://estado.ac.gov.br/servidor-publico/legislacao-e-pccr/legislacao-e-pccr-diretas/'
  };

  if (typeof CARGOS_BMAC !== 'undefined' && Array.isArray(CARGOS_BMAC) && CARGOS_BMAC.length) {
    CARGOS_ESTRUTURA_GENERICAS[inst] = CARGOS_BMAC;
  }

  CONFIGS_INSTITUICOES_GENERICAS[inst] = {
    titulo: 'BMAC',
    desc: 'Corpo de Bombeiros Militar do Acre',
    cor: '#b91c1c',
    alertaPrev: 'BMAC/CBMAC: conferir LC AC 164/2006, LC AC 349/2018, Lei AC 2.009/2008, Lei AC 2.010/2008, banco de horas, auxílio-aptidão militar, serviço complementar, localização especial, reserva/reforma e contracheque. Não somar rubricas sem ato funcional e escala.'
  };

  CONCURSOS[inst] = {
    edital: 'BMAC/CBMAC — Concurso público 2022 para Aluno Soldado Combatente · IBFC · 153 vagas; atos de convocação e formação em 2025',
    salario: 'Remuneração inicial divulgada no edital/notícia oficial: R$ 4.344,22 para Aluno Soldado. Na tabela remuneratória do site, a referência de Soldado BM Nível I é R$ 5.007,40 e Soldado BM Nível II é R$ 5.207,53, com base na tabela PMAC/CBMAC cadastrada; confirmar atualização no DOE, SEAD/AC e contracheque.',
    vagas: '153 vagas no edital de 2022: 122 para aluno soldado combatente masculino e 31 para aluno soldado combatente feminino; 56 novos soldados formados em 2025 reforçaram unidades do interior.',
    cotas: 'Conferir reserva de vagas, sexo, classificação e regras do edital IBFC/CBMAC e atos complementares.',
    idade: 'No edital divulgado em 2022: idade mínima de 18 anos e máxima de 30 anos, além de CNH, requisitos físicos, médicos, psicológicos, toxicológicos, investigação social e demais exigências.',
    escolaridade: 'Nível superior completo para aluno soldado combatente, conforme notícia oficial do edital 2022; conferir diploma e requisitos do edital.',
    banca: 'IBFC — Instituto Brasileiro de Formação e Capacitação.',
    inscritos: 'Consultar IBFC/SEAD/DOE para total de inscritos e atos finais.',
    materias: 'Prova objetiva, conforme edital IBFC/CBMAC; conferir disciplinas oficiais do edital antes de publicar material preparatório.',
    etapas: 'Prova objetiva, prova de aptidão física, exame psicotécnico, exame médico e toxicológico, investigação criminal e social e Curso de Formação.',
    cfsd: 'Curso de Formação de Soldados Bombeiro Militar, com carga mínima divulgada de 1.600 horas-aula na convocação e turma de 2025 com 1.985 horas-aula, incluindo estágio prático.',
    estagio: 'Estágio prático e exercício inicial em unidades operacionais, conforme normas de ensino, disciplina militar e atos do CBMAC.',
    validade: 'Conferir validade, homologação, prorrogações e convocações no DOE/SEAD/IBFC; o concurso de 2022 teve atos de matrícula e formação em 2025.',
    previsao: 'Não afirmar novo concurso aberto sem edital no DOE/SEAD. O portal deve tratar o concurso 2022/2025 como histórico recente e monitorar novas autorizações.',
    site: 'https://sead.ac.gov.br/editais-cbmac-corpo-de-bombeiros-militar-do-estado-do-acre/'
  };

  ACOES_JUDICIAIS[inst] = [
    { titulo: 'BMAC — tabela PMAC/CBMAC, enquadramento e progressão', status: 'Conferência individual', ano: 'LC AC 164/2006 · LC AC 349/2018', tipo: 'individual', desc: 'Verificar se posto/graduação, nível, promoções, enquadramento e reflexos foram implantados conforme tabela dos militares estaduais do Acre. Diferenças dependem de ficha funcional e contracheque.', base: 'LC AC 164/2006, LC AC 349/2018, tabela PMAC/CBMAC, boletins, atos de promoção e fichas financeiras.', fonte: 'Portal do Estado do Acre / ALEAC', fonteUrl: 'https://estado.ac.gov.br/servidor-publico/legislacao-e-pccr/legislacao-e-pccr-diretas/', atualizado: 'Maio/2026' },
    { titulo: 'BMAC — serviço complementar, banco de horas, escala e localização especial', status: 'Depende de escala e ato', ano: 'Lei AC 2.148/2009 e normas correlatas', tipo: 'individual', desc: 'Pode haver conferência quando o militar cumpriu serviço extra, banco de horas, missão, plantão, lotação especial ou função de chefia sem pagamento correto. Não tratar como direito automático para toda a tropa.', base: 'Lei AC 2.148/2009, Decreto regulamentar, escalas, boletins, ordem de serviço, lotação, contracheques e ato de designação.', fonte: 'Portal do Estado do Acre / DOE/AC', fonteUrl: 'https://estado.ac.gov.br/servidor-publico/legislacao-e-pccr/legislacao-e-pccr-diretas/', atualizado: 'Maio/2026' },
    { titulo: 'BMAC — reserva, reforma, pensão militar e proteção social', status: 'Análise individual', ano: 'Tema permanente', tipo: 'individual', desc: 'Conferir data de ingresso, tempo militar, idade, posto/graduação, reforma por incapacidade, paridade/integralidade quando cabível e cálculo de proventos/pensão.', base: 'Estatuto dos Militares do Acre, normas de proteção social militar, Acreprevidência, ficha funcional e processo de reserva/reforma.', fonte: 'Acreprevidência / Portal do Estado do Acre', fonteUrl: 'https://estado.ac.gov.br/', atualizado: 'Maio/2026' }
  ];

  ASSOCIACOES[inst] = [
    { nome: 'AME-AC — Associação dos Militares Estaduais do Acre', foco: 'Policiais militares, bombeiros militares, veteranos, pensionistas e familiares no Acre', acao: 'Representação associativa, acompanhamento de pautas da carreira militar estadual, valorização profissional, previdência, assistência e comunicação institucional.', site: 'https://ameac.com.br', telefone: 'Consultar canais oficiais da entidade', mensalidade: 'Consultar diretamente na entidade', servicos: 'Orientação associativa, comunicação de pautas, eventual apoio jurídico conforme contrato, eventos e acompanhamento institucional.' },
    { nome: 'CBSAÚDE — Cooperativa de Saúde dos Servidores Públicos do Corpo de Bombeiros do Acre', foco: 'Comunidade vinculada ao Corpo de Bombeiros Militar do Acre e projetos apoiados pela corporação', acao: 'Apoio em iniciativas de saúde e atendimento vinculadas ao ambiente institucional do CBMAC, conforme parcerias divulgadas publicamente.', site: 'Consultar canais oficiais', telefone: 'Consultar diretamente', mensalidade: 'Consultar diretamente', servicos: 'Atendimento/apoio de saúde conforme parceria, regra interna e disponibilidade institucional.' },
    { nome: 'Entidades representativas dos militares estaduais do Acre', foco: 'Oficiais e praças da PMAC e do BMAC/CBMAC, ativos, reserva, reformados e pensionistas', acao: 'Espaço para cadastrar entidades locais adicionais que atuem com remuneração, carreira, promoções, saúde, reserva/reforma e condições de serviço.', site: 'Consultar canais oficiais', telefone: 'Consultar diretamente', mensalidade: 'Consultar diretamente', servicos: 'Representação, comunicação institucional, convênios, orientação ao associado e acompanhamento de demandas administrativas e judiciais.' }
  ];
}

function aplicarDadosEspecificosBmal() {
  const inst = 'bmal';
  const estado = 'al';
  const efetivoLegal = 3246;
  const populacaoAl = 3220848;
  const relacao = Math.round(populacaoAl / efetivoLegal);

  HEADER_ESTADOS[estado] = HEADER_ESTADOS[estado] || {
    nome: 'Alagoas',
    sigla: 'AL',
    flag: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira_de_Alagoas.svg'
  };
  HEADER_ESTADOS[estado].bombeiro = inst;
  HEADER_ESTADOS[estado].bm = inst;

  HEADER_INSTITUICOES_RESUMO[inst] = {
    nome: 'Corpo de Bombeiros Militar de Alagoas',
    sigla: 'BMAL',
    siglaInterna: 'CBMAL',
    estado: 'Alagoas',
    estadoSigla: 'AL',
    tipo: 'Bombeiro Militar',
    criacao: 'Estrutura militar estadual consolidada; organização básica moderna pela Lei AL nº 7.444/2012 e efetivo fixado pela Lei AL nº 8.668/2022',
    ativa: efetivoLegal,
    ativaLabel: '≈ 3,2 mil bombeiros militares — referência legal de efetivo fixado pela Lei AL nº 8.668/2022; usar como estimativa/teto operacional até conferência em folha ou transparência',
    reserva: 1800,
    reservaLabel: '≈ 1,8 mil vínculos de reserva, reforma e pensionistas — estimativa técnica para noção do usuário; conferir AL Previdência, DOE/AL e folha antes de uso jurídico/remuneratório',
    femininas: 450,
    femininasLabel: '≈ 450 mulheres — estimativa técnica por composição provável da tropa e entradas recentes; não usar como quantitativo oficial fechado',
    populacao: populacaoAl,
    populacaoLabel: '3.220.848 habitantes',
    populacaoTitulo: 'População estimada de Alagoas em 1º de julho de 2025, segundo IBGE',
    relacaoLabel: `≈ 1 bombeiro militar para cada ${relacao.toLocaleString('pt-BR')} habitantes`,
    relacaoTitulo: `Relação estimada população/efetivo: ${populacaoAl.toLocaleString('pt-BR')} habitantes ÷ ${efetivoLegal.toLocaleString('pt-BR')} bombeiros militares fixados em lei`,
    governador: 'Paulo Dantas',
    comando: 'Coronel BM Sérgio André Silva Verçosa — Comandante-Geral do CBMAL',
    estrutura: 'Comando-Geral, Comando Operacional de Bombeiros, Diretorias de Ensino, Pessoal, Apoio Logístico, Finanças e Tecnologia da Informação, unidades operacionais, atividades técnicas, prevenção, combate a incêndio, busca e salvamento, atendimento pré-hospitalar, defesa civil e análise/vistoria de segurança contra incêndio e pânico.',
    sede: 'Comando-Geral do CBMAL — Maceió/AL',
    emergencia: '193',
    fonte: 'CBMAL; SAPL/ALEAL; Transparência/AL; DOE/AL; IBGE; SEPLAG/AL',
    atualizado: 'BMAL revisado em 06/05/2026 — dados populacionais oficiais, efetivo por lei estadual e demais números exibidos como estimativas identificadas; remuneração estimada por tabela legal e RGAs até maio/2026'
  };

  REMUNERACAO_FONTES_OFICIAIS[inst] = {
    nome: 'CBMAL, Transparência/AL e SAPL/ALEAL — Lei AL 7.580/2014, Lei AL 7.581/2014, Lei AL 8.668/2022 e revisões gerais até a Lei AL 9.852/2026; tabela exibida como estimativa técnica de maio/2026',
    url: 'https://www.cbm.al.gov.br/paginas/legislacao'
  };

  if (typeof CARGOS_BMAL !== 'undefined' && Array.isArray(CARGOS_BMAL) && CARGOS_BMAL.length) {
    CARGOS_ESTRUTURA_GENERICAS[inst] = CARGOS_BMAL;
  }

  CONFIGS_INSTITUICOES_GENERICAS[inst] = {
    titulo: 'BMAL',
    desc: 'Corpo de Bombeiros Militar de Alagoas',
    cor: '#b91c1c',
    alertaPrev: 'BMAL/CBMAL: a tabela remuneratória é estimativa técnica de maio/2026 a partir da Lei AL 7.580/2014 e revisões gerais identificadas até a Lei AL 9.852/2026. Conferir DOE/AL, SEPLAG/AL, Portal da Transparência, ficha financeira e contracheque. Não somar serviço voluntário remunerado, adicional de compensação orgânica, diárias, uniforme, função, indenizações ou parcelas pessoais sem ato, escala e previsão legal.'
  };

  CONCURSOS[inst] = {
    edital: 'BMAL/CBMAL — monitorar portal oficial do CBMAL, SEPLAG/AL, DOE/AL e banca designada; histórico recente de seleções para Soldado Combatente e Oficial Bombeiro Militar deve ser tratado como histórico, não como concurso aberto.',
    salario: 'Referência remuneratória estimada do site: Aluno Soldado BM ≈ R$ 2.371,28; Soldado BM ≈ R$ 6.125,51; Cadete 1º ano ≈ R$ 3.901,74; Aspirante a Oficial BM ≈ R$ 11.674,25; confirmar valor inicial no edital vigente, pois edital pode usar bolsa/subsídio de formação específico.',
    vagas: 'Consultar edital vigente para número de vagas por cargo, sexo, ampla concorrência, cotas, cadastro de reserva, especialidades e distribuição territorial.',
    cotas: 'Conferir regras de reserva de vagas, heteroidentificação, PCD quando aplicável, sexo, idade, altura e demais exigências diretamente no edital vigente.',
    idade: 'Critérios de idade, altura, CNH e aptidão física dependem do edital e da legislação estadual vigente; não aplicar regra genérica sem conferir o certame.',
    escolaridade: 'Soldado/Aluno Soldado e Oficial/Cadete devem ser tratados conforme edital vigente; conferir nível exigido, diploma, CNH e requisitos militares.',
    banca: 'A definir no edital vigente; monitorar SEPLAG/AL, DOE/AL, CBMAL e página da banca contratada.',
    inscritos: 'Consultar banca/SEPLAG/DOE para total de inscritos, homologação, resultado final e convocações.',
    materias: 'Disciplinas e pesos dependem do edital vigente; não publicar grade fechada sem conferir edital e retificações.',
    etapas: 'Normalmente inclui prova objetiva, exames médicos, TAF, avaliação psicológica, investigação social, curso de formação e fases próprias da carreira militar; conferir edital vigente.',
    cfsd: 'Curso de Formação de Praças Bombeiros Militares conforme Lei de Ensino, atos do CBMAL e edital; carga horária, bolsa/subsídio e regime disciplinar devem ser conferidos no edital.',
    estagio: 'Estágio operacional e exercício inicial dependem de ato do CBMAL, boletim, curso de formação, lotação e necessidade operacional.',
    validade: 'Conferir homologação, validade, prorrogação e convocações no DOE/AL, SEPLAG/AL, CBMAL e banca.',
    previsao: 'Não afirmar novo concurso aberto sem edital publicado. Exibir como monitoramento permanente de carreira estadual militar.',
    site: 'https://www.cbm.al.gov.br/paginas/view/4/concursos'
  };

  ACOES_JUDICIAIS[inst] = [
    { titulo: 'BMAL — subsídio, revisão geral anual e diferenças remuneratórias', status: 'Conferência individual', ano: 'Leis AL 7.580/2014 a 9.852/2026', tipo: 'individual', desc: 'Verificar se posto/graduação, Nível I/Nível II, revisões gerais, promoções e reflexos foram implantados corretamente em ficha financeira e contracheque. Não tratar a estimativa do portal como liquidação de valores.', base: 'Lei AL 7.580/2014, revisões gerais anuais, DOE/AL, ficha financeira, atos de promoção e contracheques.', fonte: 'CBMAL / SAPL-ALEAL / Transparência AL', fonteUrl: 'https://www.cbm.al.gov.br/paginas/legislacao', atualizado: 'Maio/2026' },
    { titulo: 'BMAL — serviço voluntário remunerado, diárias, uniforme e adicionais', status: 'Depende de escala e ato', ano: 'Lei AL 7.581/2014 e normas correlatas', tipo: 'individual', desc: 'Conferir escala, autorização, jornada, limite mensal, diárias, verba de uniforme, adicional de compensação orgânica e eventuais indenizações. Serviço voluntário remunerado é eventual e não incorporável.', base: 'Lei AL 7.581/2014, decretos de diárias/uniforme, escala, boletim, ordem de serviço, lotação, ato administrativo e contracheque.', fonte: 'CBMAL / DOE-AL / Transparência AL', fonteUrl: 'https://www.cbm.al.gov.br/paginas/legislacao', atualizado: 'Maio/2026' },
    { titulo: 'BMAL — fluxo de acesso, promoções, reserva/reforma e proteção social', status: 'Análise funcional', ano: 'Lei AL 8.668/2022 e normas militares estaduais', tipo: 'individual', desc: 'A Lei AL nº 8.668/2022 fixa efetivo, quadros e fluxo de acesso. Promoções, reserva, reforma, incapacidade, pensão e proteção social exigem análise de data de ingresso, tempo de serviço, quadro, posto/graduação, ficha funcional e atos publicados.', base: 'Lei AL 8.668/2022, Estatuto da PMAL aplicado aos militares estaduais, normas de promoção, proteção social militar e processo administrativo.', fonte: 'SAPL-ALEAL / CBMAL / DOE-AL', fonteUrl: 'https://sapl.al.al.leg.br/norma/2273', atualizado: 'Maio/2026' }
  ];

  ASSOCIACOES[inst] = [
    { nome: 'AMEAL — Associação dos Militares do Estado de Alagoas', foco: 'Militares estaduais de Alagoas, incluindo policiais e bombeiros militares, ativos, veteranos e pensionistas', acao: 'Acompanhamento de pautas remuneratórias, carreira, proteção social, representação associativa, comunicação institucional e eventual apoio ao associado conforme regras internas.', site: 'https://ameal.org.br', telefone: 'Consultar canais oficiais da entidade', mensalidade: 'Consultar diretamente na entidade', servicos: 'Orientação associativa, acompanhamento legislativo, comunicação de pautas, convênios e apoio jurídico conforme contrato/estatuto.' },
    { nome: 'Entidades de oficiais e praças militares estaduais de Alagoas', foco: 'Oficiais, praças, reserva, reformados e pensionistas da PMAL e do CBMAL', acao: 'Espaço para cadastrar entidades locais adicionais ligadas a remuneração, promoções, carreira, saúde, reserva/reforma e condições de serviço.', site: 'Consultar canais oficiais', telefone: 'Consultar diretamente', mensalidade: 'Consultar diretamente', servicos: 'Representação, convênios, orientação ao associado e acompanhamento administrativo/judicial.' },
    { nome: 'Canais institucionais do CBMAL', foco: 'Informação oficial para bombeiros militares e sociedade', acao: 'Publicações, legislação, diretoria, concursos, atividades técnicas, prevenção e comunicação institucional.', site: 'https://www.cbm.al.gov.br', telefone: 'Consultar portal oficial', mensalidade: 'Não se aplica', servicos: 'Legislação, notícias, concursos, normas técnicas, comunicação e serviços oficiais.' }
  ];
}


function aplicarDadosEspecificosBmam() {
  const inst = 'bmam';
  const estado = 'am';
  const efetivoEstimado = 1500;
  const populacaoAm = 4321616;
  const relacao = Math.round(populacaoAm / efetivoEstimado);

  HEADER_ESTADOS[estado] = HEADER_ESTADOS[estado] || {
    nome: 'Amazonas',
    sigla: 'AM',
    flag: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira_do_Amazonas.svg'
  };
  HEADER_ESTADOS[estado].bombeiro = inst;
  HEADER_ESTADOS[estado].bm = inst;
  if (!INSTITUICOES_VALIDAS.includes(inst)) INSTITUICOES_VALIDAS.push(inst);

  HEADER_INSTITUICOES_INFO[inst] = {
    titulo: 'BMAM',
    desc: 'Corpo de Bombeiros Militar do Amazonas'
  };

  HEADER_INSTITUICOES_RESUMO[inst] = {
    nome: 'Corpo de Bombeiros Militar do Amazonas',
    sigla: 'BMAM',
    siglaInterna: 'CBMAM',
    estado: 'Amazonas',
    estadoSigla: 'AM',
    tipo: 'Bombeiro Militar',
    criacao: '1876 · 149 anos de história em 2025; emancipado/desvinculado da PMAM pela Emenda Constitucional AM nº 31/1998 e pela Lei AM nº 2.523/1998',
    ativa: efetivoEstimado,
    ativaLabel: '≈ 1,5 mil militares ativos — referência oficial de março/2026 informa que, após a formatura de 210 novos soldados, o efetivo ultrapassou 1,5 mil militares em atividade; valor exibido como estimativa operacional para orientar o usuário',
    reserva: 900,
    reservaLabel: '≈ 900 vínculos de reserva, reforma e pensionistas — estimativa técnica para dar ordem de grandeza; conferir Amazonprev, Portal da Transparência, SEAD/AM e folha antes de uso jurídico/remuneratório',
    femininas: 230,
    femininasLabel: '≈ 230 mulheres — estimativa técnica por composição provável da tropa e entradas recentes; não usar como quantitativo oficial fechado',
    populacao: populacaoAm,
    populacaoLabel: '4.321.616 habitantes',
    populacaoTitulo: 'População estimada do Amazonas em 1º de julho de 2025, segundo IBGE',
    relacaoLabel: `≈ 1 bombeiro militar ativo para cada ${relacao.toLocaleString('pt-BR')} habitantes`,
    relacaoTitulo: `Relação estimada população/efetivo: ${populacaoAm.toLocaleString('pt-BR')} habitantes ÷ ≈ ${efetivoEstimado.toLocaleString('pt-BR')} militares ativos`,
    governador: 'Wilson Miranda Lima',
    comando: 'Coronel QOBM Orleilso Ximenes Muniz — Comandante-Geral do CBMAM',
    estrutura: 'Comando-Geral em Manaus, órgãos de direção, apoio e execução, Diretoria de Atividades Técnicas, unidades operacionais, prevenção e combate a incêndio, busca e salvamento, atendimento pré-hospitalar, defesa civil, produtos perigosos, mergulho, salvamento aquático, atividades técnicas de segurança contra incêndio e expansão de bases no interior. A corporação informou presença permanente em 23 municípios em 2026 e meta de chegar a mais 12 cidades até o fim do ano.',
    sede: 'Comando-Geral do CBMAM — Avenida Codajás, nº 1565, Petrópolis, Manaus/AM, CEP 69063-390',
    emergencia: '193',
    ocorrenciasLabel: '20.490 ocorrências atendidas em 2025 — 14.342 em Manaus e 6.148 no interior, conforme SSP/AM',
    fonte: 'CBMAM; Agência Amazonas; SSP/AM; Legisla.AM; ALEAM/SAPL; IBGE; SEAD/AM; DOE/AM',
    atualizado: 'BMAM revisado em 06/05/2026 — efetivo ativo e população com base oficial; reserva e mulheres como estimativas identificadas; remuneração por Lei AM nº 7.445/2025 com efeitos em 01/12/2025'
  };

  REMUNERACAO_FONTES_OFICIAIS[inst] = {
    nome: 'CBMAM, Legisla.AM e ALEAM/SAPL — Lei AM 3.725/2012 atualizada pela Lei AM 7.445/2025; tabela PM/BM vigente a partir de 01/12/2025',
    url: 'https://sapl.al.am.leg.br/media/sapl/public/normajuridica/2025/13902/7445.pdf'
  };

  if (typeof CARGOS_BMAM !== 'undefined' && Array.isArray(CARGOS_BMAM) && CARGOS_BMAM.length) {
    CARGOS_ESTRUTURA_GENERICAS[inst] = CARGOS_BMAM;
  }

  CONFIGS_INSTITUICOES_GENERICAS[inst] = {
    titulo: 'BMAM',
    desc: 'Corpo de Bombeiros Militar do Amazonas',
    cor: '#b91c1c',
    alertaPrev: 'BMAM/CBMAM: remuneração exibida pelo total bruto legal da Lei AM 7.445/2025, vigente a partir de 01/12/2025, sem somar automaticamente indenização de compensação orgânica e atividade técnica, função, diárias, fardamento, alimentação, saúde, retroativos ou parcelas pessoais. Conferir DOE/AM, Legisla.AM, Portal da Transparência, SEAD/AM, escala, ato funcional e contracheque.'
  };

  CONCURSOS[inst] = {
    edital: 'BMAM/CBMAM — histórico recente do concurso público de 2021 para a corporação; em 2026 o governo informou a conclusão da nomeação das 453 vagas previstas no edital, com formatura de 210 novos soldados. Para novo certame, publicar somente quando houver autorização e edital no DOE/AM, SEAD/AM, CBMAM e banca.',
    salario: 'Referência remuneratória legal do site: Aluno Soldado BM R$ 3.149,12; Soldado BM R$ 5.725,66; Aluno Oficial 1º Ano R$ 8.509,34; Aspirante a Oficial BM R$ 11.345,79; valores brutos da tabela PM/BM da Lei AM nº 7.445/2025, Anexo III, efeitos em 01/12/2025. Editais podem informar bolsa, remuneração de formação ou regras específicas.',
    vagas: '453 vagas previstas no concurso público da corporação citado pelo Governo do Amazonas; formatura de 210 novos soldados em março/2026 concluiu as nomeações desse edital.',
    cotas: 'Regras de vagas por cargo, sexo, ampla concorrência, cotas e cadastro de reserva dependem do edital de cada certame e das retificações publicadas.',
    idade: 'Critérios de idade, altura, CNH, aptidão física e investigação social devem ser extraídos do edital vigente; não aplicar regra genérica sem o documento oficial.',
    escolaridade: 'Aluno Soldado e Aluno Oficial/Cadete devem seguir o edital vigente; conferir nível exigido, diploma, CNH, documentos militares e requisitos legais no DOE/AM e na banca.',
    banca: 'Banca do concurso vigente/histórico deve ser conferida no edital; manter monitoramento em CBMAM, SEAD/AM, DOE/AM e portal da organizadora.',
    inscritos: 'Total de inscritos, homologação e convocações devem ser conferidos no portal da banca e no Diário Oficial do Amazonas.',
    materias: 'Disciplinas, pesos e conteúdo programático variam conforme cargo e edital; publicar grade fechada somente após leitura do edital e retificações.',
    etapas: 'Em regra, certames militares envolvem prova objetiva, TAF, exames médicos, avaliação psicológica, investigação social, curso de formação e fases próprias da carreira bombeiro militar, conforme edital.',
    cfsd: 'Curso de Formação de Soldados concluído em março/2026 por 210 novos soldados, com dez meses de treinamento, incluindo combate a incêndios urbanos e florestais, salvamento em altura/aquático, resgate veicular, produtos perigosos e procedimentos operacionais.',
    estagio: 'Exercício inicial e lotação operacional dependem de ato do CBMAM. A turma formada em 2026 reforça capital e interior em meio à expansão de bases permanentes.',
    validade: 'Validade, prorrogações, atos de convocação, matrículas e formaturas devem ser conferidos no DOE/AM, CBMAM, SEAD/AM e banca.',
    previsao: 'Sem novo concurso aberto confirmado nesta revisão. O site deve exibir o concurso 2021/2026 como histórico recente e monitorar autorizações futuras.',
    site: 'https://www.cbm.am.gov.br/cbmam/concursos'
  };

  ACOES_JUDICIAIS[inst] = [
    { titulo: 'BMAM — tabela PM/BM, soldo, gratificação de tropa e GAMS', status: 'Conferência individual', ano: 'Lei AM 3.725/2012 · Lei AM 7.445/2025', tipo: 'individual', desc: 'Verificar se posto/graduação, soldo, gratificação de tropa, GAMS quando cabível, revisões de 2025 e reflexos foram implantados corretamente no contracheque. A tabela do site é referência de orientação e não liquidação individual.', base: 'Lei AM nº 3.725/2012, Lei AM nº 7.445/2025, DOE/AM, ficha financeira, atos de promoção e contracheques.', fonte: 'Legisla.AM / ALEAM-SAPL / SEAD-AM', fonteUrl: 'https://sapl.al.am.leg.br/media/sapl/public/normajuridica/2025/13902/7445.pdf', atualizado: 'Maio/2026' },
    { titulo: 'BMAM — indenização de compensação orgânica e atividade técnica', status: 'Depende de habilitação, atividade e ato', ano: 'Lei AM 7.445/2025 · Anexo IV', tipo: 'individual', desc: 'Conferir se o militar exerce atividade técnica indenizável, como motorista, operador, mergulhador, aeronave, explosivista ou outras funções listadas, com habilitação, escala e ato de designação. Não é parcela automática para toda a tropa.', base: 'Anexo IV da Lei AM nº 7.445/2025, escalas, habilitações, boletins, ordem de serviço, lotação e contracheque.', fonte: 'Legisla.AM / DOE-AM / CBMAM', fonteUrl: 'https://legisla.imprensaoficial.am.gov.br/diario_am/12/2025/4/15715?o=1', atualizado: 'Maio/2026' },
    { titulo: 'BMAM — promoções, quadro de acesso, reserva/reforma e proteção social', status: 'Análise funcional', ano: 'Tema permanente', tipo: 'individual', desc: 'Promoções, interstícios, curso de formação/aperfeiçoamento, reserva remunerada, reforma, pensão militar, incapacidade e proteção social dependem de data de ingresso, posto/graduação, quadro, tempo de serviço, ficha funcional e atos publicados.', base: 'Lei de Organização Básica, Estatuto dos Militares Estaduais, normas de promoção, proteção social militar, boletins e processo administrativo individual.', fonte: 'CBMAM / Legisla.AM / DOE-AM / Amazonprev', fonteUrl: 'https://www.cbm.am.gov.br/cbmam/legislacaos/listar', atualizado: 'Maio/2026' }
  ];

  ASSOCIACOES[inst] = [
    { nome: 'ACS/AM — Associação dos Cabos e Soldados da Polícia Militar e Bombeiro Militar do Amazonas', foco: 'Praças da PMAM e do CBMAM, ativos, veteranos e pensionistas', acao: 'Representação associativa, acompanhamento de pautas remuneratórias, carreira, proteção social, condições de serviço e comunicação com a categoria.', site: 'https://acs-am.com.br', telefone: 'Consultar canais oficiais da entidade', mensalidade: 'Consultar diretamente na entidade', servicos: 'Orientação associativa, comunicação de pautas, convênios e eventual apoio jurídico conforme contrato/estatuto.' },
    { nome: 'Entidades de oficiais e praças militares estaduais do Amazonas', foco: 'Oficiais, praças, reserva, reformados e pensionistas da PMAM e do CBMAM', acao: 'Espaço para cadastrar entidades locais adicionais ligadas a remuneração, promoções, carreira, saúde, reserva/reforma e condições de serviço.', site: 'Consultar canais oficiais da entidade', telefone: 'Consultar diretamente na entidade', mensalidade: 'Consultar diretamente na entidade', servicos: 'Representação, convênios, orientação ao associado e acompanhamento administrativo/judicial.' },
    { nome: 'Canais institucionais do CBMAM', foco: 'Informação oficial para bombeiros militares e sociedade amazonense', acao: 'Publicações, legislação, concursos, serviços técnicos, prevenção, notícias, comunicação institucional e atendimento ao público.', site: 'https://www.cbm.am.gov.br', telefone: '(92) 9 9123-3129 — canal institucional informado no portal oficial', mensalidade: 'Não se aplica', servicos: 'Legislação, notícias, concursos, atividades técnicas, serviços oficiais e comunicação institucional.' }
  ];
}


function aplicarDadosEspecificosBmap() {
  const inst = 'bmap';
  const estado = 'ap';
  const efetivoAtivo = 1073;
  const populacaoAp = 806517;
  const reservaEstimada = 600;
  const mulheresEstimadas = 180;
  const relacao = Math.round(populacaoAp / efetivoAtivo);

  HEADER_ESTADOS[estado] = HEADER_ESTADOS[estado] || {
    nome: 'Amapá',
    sigla: 'AP',
    pm: 'pmap',
    bm: inst,
    pc: 'pcap',
    pp: 'ppap',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Bandeira_do_Amap%C3%A1.svg'
  };
  HEADER_ESTADOS[estado].bm = inst;
  if (!INSTITUICOES_VALIDAS.includes(inst)) INSTITUICOES_VALIDAS.push(inst);

  HEADER_INSTITUICOES_INFO[inst] = {
    titulo: 'BMAP',
    desc: 'Corpo de Bombeiros Militar do Amapá'
  };

  HEADER_INSTITUICOES_RESUMO[inst] = {
    nome: 'Corpo de Bombeiros Militar do Amapá',
    sigla: 'BMAP',
    siglaInterna: 'CBMAP',
    estado: 'Amapá',
    estadoSigla: 'AP',
    tipo: 'Bombeiro Militar',
    criacao: '1967 · organização do Corpo de Bombeiros no então Território Federal do Amapá; 1992 · autonomia funcional e administrativa como CBMAP',
    ativa: efetivoAtivo,
    ativaLabel: '1.073 bombeiros militares — referência institucional do portal CBMAP, exibida como ordem de grandeza operacional sujeita a atualização por DRH/folha',
    reserva: reservaEstimada,
    reservaLabel: '≈ 600 vínculos de reserva, reforma e pensionistas — estimativa técnica para dar noção de grandeza; conferir AMPRev, SEAD/AP, DOE/AP, ficha financeira e DRH/CBMAP antes de uso jurídico ou previdenciário',
    total: efetivoAtivo + reservaEstimada,
    totalLabel: '≈ 1,7 mil vínculos somando efetivo ativo informado pelo CBMAP e estimativa de inativos/pensionistas',
    femininas: mulheresEstimadas,
    femininasLabel: '≈ 180 mulheres — estimativa técnica por composição provável da tropa; não usar como quantitativo oficial fechado',
    populacao: populacaoAp,
    populacaoLabel: '806.517 habitantes',
    populacaoTitulo: 'População estimada do Amapá em 1º de julho de 2025, segundo IBGE',
    relacaoLabel: `≈ 1 bombeiro militar ativo para cada ${relacao.toLocaleString('pt-BR')} habitantes`,
    relacaoTitulo: `Relação estimada ativa/população: ${populacaoAp.toLocaleString('pt-BR')} habitantes ÷ ${efetivoAtivo.toLocaleString('pt-BR')} bombeiros militares informados pelo portal institucional`,
    governador: 'Clécio Luís',
    comando: 'Coronel QOCBM Pelsondré Martins da Silva — Comandante-Geral do CBMAP',
    estrutura: 'Comando-Geral; Diretorias de Administração Geral, Ensino/Pesquisa/Extensão, Inteligência e Operações, Pessoal e Segurança Contra Incêndio e Pânico; Corregedoria, Controladoria, Academia Bombeiro Militar, Centro de Comunicação Social, Centro de Tecnologia da Informação, Centro de Logística e Centro de Saúde; Grupamentos 1º, 2º, 5º, 6º, 7º, GPCIF e GMAF, além de atuação em Macapá, Santana, Porto Grande, Oiapoque, Laranjal do Jari e Vitória do Jari.',
    sede: 'Rua Hamilton Silva, nº 1647, bairro Santa Rita, Macapá/AP, CEP 68.900-068',
    emergencia: '193',
    coberturaLabel: '≈ 85% da população estadual atendida diretamente, conforme histórico institucional do CBMAP',
    ocorrenciasLabel: 'Operações, prevenção, fiscalização e resposta operacional monitoradas pela Revista CBMAP360°, DIOP/CBMAP, DISCIP/CBMAP e publicações oficiais; usar número operacional anual somente quando houver relatório fechado',
    fonte: 'CBMAP; SEAD/AP; Diário Oficial do Amapá; Portal da Transparência/AP; IBGE; Agência Amapá; Fundação Carlos Chagas',
    atualizado: 'BMAP revisado em 06/05/2026 — efetivo e comando com base no portal oficial; população 2025 do IBGE; reserva e mulheres como estimativas identificadas; remuneração por LC AP nº 173/2025, Anexo III, efeitos em 01/04/2026'
  };

  REMUNERACAO_FONTES_OFICIAIS[inst] = {
    nome: 'CBMAP, SEAD/AP e Diário Oficial do Amapá — LC AP nº 113/2018 alterada pela LC AP nº 173/2025; Tabela de Progressão Horizontal 2026 I, vigente a partir de 01/04/2026',
    url: 'https://editor.amapa.gov.br/arquivos_portais/publicacoes/SEAD_6df4154451d39fe1495462a15d40471c.pdf'
  };

  if (typeof CARGOS_BMAP !== 'undefined' && Array.isArray(CARGOS_BMAP) && CARGOS_BMAP.length) {
    CARGOS_ESTRUTURA_GENERICAS[inst] = CARGOS_BMAP;
  }

  CONFIGS_INSTITUICOES_GENERICAS[inst] = {
    titulo: 'BMAP',
    desc: 'Corpo de Bombeiros Militar do Amapá',
    cor: '#b91c1c',
    alertaPrev: 'BMAP/CBMAP: remuneração exibida como subsídio bruto mensal legal por posto/graduação e progressão horizontal, conforme LC AP 113/2018 alterada pela LC AP 173/2025. Não somar automaticamente indenizações, diárias, alimentação, fardamento, serviço extraordinário, funções, parcelas pessoais, retroativos ou rubricas de quadros federais do ex-Território. Conferir DOE/AP, SEAD/AP, Portal da Transparência, escala, ato funcional e contracheque.'
  };

  CONCURSOS[inst] = {
    edital: 'BMAP/CBMAP — Concurso QOCBM/CBMAP 2025 para Oficial Combatente, cadastro de reserva, Edital nº 01/2025, Fundação Carlos Chagas; e histórico do CFSD/BM/CBMAP 2022 com convocações em 2026. Publicar novo certame somente com edital no DOE/AP, SEAD/AP, CBMAP e banca.',
    salario: 'Referência remuneratória legal do site pela LC AP nº 173/2025, Anexo III, efeitos em 01/04/2026: Aluno Soldado BM Base R$ 3.213,26; Soldado BM Base R$ 6.039,13; Aluno Oficial 1º ano vinculado ao 2º Sargento Base R$ 8.592,24; Aluno Oficial 2º ano vinculado ao 1º Sargento Base R$ 9.574,23; Aluno Oficial 3º ano vinculado ao Subtenente Base R$ 10.556,19; Aspirante Oficial Base R$ 10.678,93; 2º Tenente Base R$ 11.660,90. Editais podem informar bolsa/remuneração de formação e regras próprias.',
    vagas: 'QOCBM/CBMAP 2025: 180 vagas em cadastro de reserva para Oficial Combatente. CFSD/BM/CBMAP 2022/2026: concurso de Soldado em andamento histórico, com convocações; o Governo do Amapá informou expectativa de convocar até 1.500 aprovados e que esse número já foi superado em convocações.',
    cotas: 'Conferir reserva de vagas, critérios de sexo, ampla concorrência, cotas, lista final, cadastro de reserva e retificações no edital da FCC, SEAD/AP e DOE/AP.',
    idade: 'No edital QOCBM/CBMAP 2025, conferir requisitos de idade, diploma superior, altura, CNH, saúde, aptidão física, avaliação psicológica e investigação social. Não replicar regra de outro estado.',
    escolaridade: 'QOCBM/CBMAP 2025 exige diploma de curso superior, conforme edital. CFSD/Soldado deve ser conferido no edital próprio e suas retificações.',
    banca: 'Fundação Carlos Chagas no edital QOCBM/CBMAP 2025; verificar banca e atos complementares para CFSD/Soldado e futuros certames.',
    inscritos: 'Total de inscritos, homologação e convocações devem ser conferidos na FCC, SEAD/AP, DOE/AP e portal do CBMAP.',
    materias: 'Conteúdo programático consta no edital da banca. Publicar disciplinas, pesos e notas de corte somente após leitura da versão vigente e retificações.',
    etapas: 'QOCBM/CBMAP 2025: prova objetiva, exame documental, avaliação das capacidades físicas, teste de avaliação psicológica, exame de saúde e investigação social. CFSD/Soldado possui fases próprias conforme edital.',
    cfsd: 'Curso de Formação de Soldados Bombeiro Militar e Curso de Formação de Oficial Combatente dependem de matrícula, aprovação nas fases, cronograma de ensino, regime militar e atos do CBMAP/SEAD.',
    estagio: 'Exercício inicial, estágio supervisionado e lotação operacional dependem de ato do CBMAP e necessidade da corporação na capital/interior.',
    validade: 'Conferir validade, prorrogações, convocações, matrículas e homologações no DOE/AP, SEAD/AP, CBMAP e banca. Não afirmar concurso aberto sem fonte atual.',
    previsao: 'Manter monitoramento do QOCBM/CBMAP 2025, CFSD/BM 2022/2026 e novas autorizações; tratar dados como situação de acompanhamento até novo edital/ato oficial.',
    site: 'https://bombeiros.portal.ap.gov.br/'
  };

  ACOES_JUDICIAIS[inst] = [
    { titulo: 'BMAP — subsídio, progressão horizontal e enquadramento', status: 'Conferência individual', ano: 'LC AP 113/2018 · LC AP 173/2025', tipo: 'individual', desc: 'Verificar se posto/graduação, nível de progressão horizontal, tempo de efetivo serviço, promoções e reflexos foram implantados corretamente. A tabela do site orienta a conferência, mas não liquida diferenças individuais.', base: 'LC AP nº 113/2018 alterada pela LC AP nº 173/2025, DOE/AP, ficha funcional, atos de promoção/progressão e contracheques.', fonte: 'SEAD/AP / Diário Oficial do Amapá', fonteUrl: 'https://editor.amapa.gov.br/arquivos_portais/publicacoes/SEAD_6df4154451d39fe1495462a15d40471c.pdf', atualizado: 'Maio/2026' },
    { titulo: 'BMAP — indenizações, diárias, serviço extraordinário e rubricas não automáticas', status: 'Depende de ato, escala e lotação', ano: 'Tema permanente', tipo: 'individual', desc: 'Conferir diárias, ajuda de custo, alimentação, fardamento, serviço extraordinário, função, lotação especial, indenizações operacionais e eventuais retroativos. Não tratar como parcela universal da tropa.', base: 'Legislação estadual, decretos, boletins, escala, ordem de serviço, ato de designação, ficha financeira e contracheque.', fonte: 'CBMAP / SEAD-AP / DOE-AP', fonteUrl: 'https://bombeiros.portal.ap.gov.br/', atualizado: 'Maio/2026' },
    { titulo: 'BMAP — reserva, reforma, pensão militar e quadros do ex-Território', status: 'Análise individual', ano: 'Tema previdenciário e funcional', tipo: 'individual', desc: 'Amapá tem situações que podem envolver militares estaduais e quadros federais oriundos do ex-Território. Não misturar tabela estadual do CBMAP com remuneração federal de transposição/ex-Território sem verificar vínculo, ato e regime jurídico.', base: 'Ficha funcional, ato de ingresso/transposição, processo de reserva/reforma, AMPRev, legislação estadual e federal aplicável, contracheques e decisões individuais.', fonte: 'SEAD/AP / AMPRev / Governo Federal quando houver quadro federal', fonteUrl: 'https://www.transparencia.ap.gov.br/', atualizado: 'Maio/2026' }
  ];

  ASSOCIACOES[inst] = [
    { nome: 'ASMEAP — Associação dos Militares Estaduais do Amapá', foco: 'Militares estaduais do Amapá, incluindo policiais e bombeiros militares, ativos, veteranos e pensionistas', acao: 'Representação associativa, acompanhamento de pautas de carreira, remuneração, proteção social, promoções e condições de serviço.', site: 'https://www.asmeap.com.br', telefone: 'Consultar canais oficiais da entidade', mensalidade: 'Consultar diretamente na entidade', servicos: 'Orientação associativa, convênios, comunicação de pautas e eventual apoio jurídico conforme estatuto/contrato.' },
    { nome: 'ASPOMETERFA — associação vinculada a militares do Amapá e ex-Território', foco: 'Militares estaduais/federais, veteranos, pensionistas e pautas ligadas a transposição e proteção social, conforme atuação da entidade', acao: 'Acompanhamento associativo de demandas funcionais, previdenciárias e remuneratórias. Conferir escopo atualizado diretamente com a entidade.', site: 'https://www.facebook.com/ASPOMETERFA', telefone: 'Consultar diretamente', mensalidade: 'Consultar diretamente', servicos: 'Representação, orientação ao associado e acompanhamento de pautas administrativas/judiciais.' },
    { nome: 'Canais institucionais do CBMAP', foco: 'Informação oficial para bombeiros militares e sociedade amapaense', acao: 'Publicações, legislação, editais, serviços técnicos, prevenção, Revista CBMAP360°, notícias e comunicação institucional.', site: 'https://bombeiros.portal.ap.gov.br/', telefone: 'Emergência 193; atendimento institucional em horário comercial no portal oficial', mensalidade: 'Não se aplica', servicos: 'Notícias, editais, alvarás, segurança contra incêndio e pânico, transparência, serviços técnicos e comunicação institucional.' }
  ];
}

function inserirOptionBombeiroNoSelect(select, item) {
  if (!select || Array.from(select.options || []).some(opt => opt.value === item.inst)) return;
  let grupo = Array.from(select.querySelectorAll('optgroup')).find(optgroup => optgroup.label === item.nome);
  if (!grupo) {
    grupo = document.createElement('optgroup');
    grupo.label = item.nome;
    select.appendChild(grupo);
  }

  const opt = criarOptionInstituicao(item.inst, `${item.titulo} - Bombeiros Militares`);
  const pmOption = Array.from(grupo.querySelectorAll('option')).find(option => String(option.value || '').startsWith('pm'));
  if (pmOption && pmOption.nextSibling) grupo.insertBefore(opt, pmOption.nextSibling);
  else grupo.appendChild(opt);
}

function aplicarEstruturaBombeirosMilitaresNoHtml() {
  BOMBEIROS_MILITARES_ESTRUTURA.forEach(item => {
    ['instituicao_header', 'instituicao', 'instituicao_home'].forEach(id => inserirOptionBombeiroNoSelect(document.getElementById(id), item));
  });
}

function aplicarEstruturaEstadosFaltantesDados() {
  ESTADOS_ESTRUTURA_FALTANTES.forEach(estado => {
    if (!HEADER_ESTADOS[estado.estado]) {
      HEADER_ESTADOS[estado.estado] = { nome: estado.nome, sigla: estado.sigla, pm: estado.pm, pc: estado.pc, pp: estado.pp, flag: estado.flag };
    }

    const instituicoes = [
      { ramo: 'pm', inst: estado.pm, titulo: estado.pmSigla, desc: `Polícia Militar de ${estado.nome}` },
      { ramo: 'pc', inst: estado.pc, titulo: estado.pcSigla, desc: `Polícia Civil de ${estado.nome}` },
      { ramo: 'pp', inst: estado.pp, titulo: estado.ppSigla, desc: `Polícia Penal de ${estado.nome}` }
    ];

    instituicoes.forEach(item => {
      if (!INSTITUICOES_VALIDAS.includes(item.inst)) INSTITUICOES_VALIDAS.push(item.inst);
      if (!HEADER_INSTITUICOES_INFO[item.inst]) HEADER_INSTITUICOES_INFO[item.inst] = { titulo: item.titulo, desc: item.desc };
      if (!HEADER_INSTITUICOES_RESUMO[item.inst]) {
        HEADER_INSTITUICOES_RESUMO[item.inst] = {
          criacao: 'A preencher',
          ativaLabel: 'Efetivo ativo — preencher',
          reservaLabel: 'Reserva/inativos — preencher',
          totalLabel: 'Total — preencher',
          relacaoLabel: 'Relação ativa — preencher',
          populacao: 0,
          governador: 'Chefe do Executivo — preencher',
          comando: 'Comando/direção atual — preencher',
          atualizado: 'Estrutura criada para preenchimento'
        };
      }
      if (!REMUNERACAO_FONTES_OFICIAIS[item.inst]) {
        REMUNERACAO_FONTES_OFICIAIS[item.inst] = { nome: `${item.titulo} — fonte oficial a preencher`, url: '#' };
      }
      CONFIGS_INSTITUICOES_GENERICAS[item.inst] = {
        titulo: item.titulo,
        desc: item.desc,
        cor: item.ramo === 'pm' ? '#1f4f7a' : item.ramo === 'pc' ? '#4b5563' : '#6b5f2f',
        alertaPrev: `${item.titulo}: estrutura aberta para preenchimento. Conferir previdência, remuneração, adicionais, auxílios, regras de ingresso e direitos conforme legislação de ${estado.nome}.`
      };
      CONCURSOS[item.inst] = CONCURSOS[item.inst] || criarConcursoEstrutura(item.inst, item, item.ramo);
      ACOES_JUDICIAIS[item.inst] = ACOES_JUDICIAIS[item.inst] || criarAcoesEstrutura(item);
      ASSOCIACOES[item.inst] = ASSOCIACOES[item.inst] || criarAssociacoesEstrutura(item, estado.nome);
    });

    if (!POLICIAS_PENAIS_INFO[estado.pp]) POLICIAS_PENAIS_INFO[estado.pp] = criarInfoPenalEstrutura(estado);
    if (!CARGOS_ESTRUTURA_GENERICAS[estado.pm]) CARGOS_ESTRUTURA_GENERICAS[estado.pm] = criarCargosPmEstrutura(estado.pm, estado.pmSigla);
    if (!CARGOS_ESTRUTURA_GENERICAS[estado.pc]) CARGOS_ESTRUTURA_GENERICAS[estado.pc] = criarCargosPcEstrutura(estado.pc, estado.pcSigla);
    if (!CARGOS_ESTRUTURA_GENERICAS[estado.pp]) CARGOS_ESTRUTURA_GENERICAS[estado.pp] = criarCargosPpEstrutura(estado.pp, estado.ppSigla);
  });
}


function aplicarDadosEspecificosPmap() {
  const inst = 'pmap';
  const estado = 'ap';
  const efetivoAtivo = 3109;
  const populacaoAp = 806517;
  const reservaEstimada = 3264;
  const mulheresEstimadas = 871;
  const relacao = Math.round(populacaoAp / efetivoAtivo);

  HEADER_ESTADOS[estado] = HEADER_ESTADOS[estado] || {
    nome: 'Amapá',
    sigla: 'AP',
    pm: inst,
    bm: 'bmap',
    pc: 'pcap',
    pp: 'ppap',
    flag: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira_do_Amap%C3%A1.svg'
  };
  HEADER_ESTADOS[estado].pm = inst;
  if (!INSTITUICOES_VALIDAS.includes(inst)) INSTITUICOES_VALIDAS.push(inst);

  HEADER_INSTITUICOES_INFO[inst] = { titulo: 'PMAP', desc: 'Polícia Militar do Estado do Amapá' };
  HEADER_INSTITUICOES_IMAGENS[inst] = 'img/MILITAR/pmap.webp';
  HEADER_INSTITUICOES_RESUMO[inst] = {
    nome: 'Polícia Militar do Estado do Amapá',
    sigla: 'PMAP',
    estado: 'Amapá',
    estadoSigla: 'AP',
    tipo: 'Polícia Militar',
    criacao: '26/11/1975 · Lei Federal nº 6.270/1975 · origem territorial; antecedente: Guarda Territorial do Amapá',
    ativa: efetivoAtivo,
    ativaLabel: '3.109 ativos (estimado)',
    reserva: reservaEstimada,
    reservaLabel: '3.264 reserva/reforma/pensionistas (estimado)',
    total: efetivoAtivo + reservaEstimada,
    totalLabel: '≈ 6.373 vínculos ativos/inativos (estimado)',
    femininas: mulheresEstimadas,
    femininasLabel: '871 mulheres (estimado)',
    populacao: populacaoAp,
    populacaoLabel: '806.517 habitantes · IBGE 2025',
    populacaoTitulo: 'População do Estado',
    relacaoLabel: `1 ativo / ${relacao.toLocaleString('pt-BR')} hab. · 0,385% (estimado)`,
    relacaoTitulo: 'Relação ativa/população',
    governador: 'Clécio Luís',
    comando: 'Cel PM Márcio Allan — Comandante-Geral',
    estrutura: 'Comando-Geral, Subcomando-Geral, Estado-Maior, diretorias, batalhões territoriais, unidades especializadas, policiamento ostensivo, ambiental, trânsito, BOPE, radiopatrulhamento, saúde, ensino, logística e corregedoria; atuação em Macapá, Santana e interior do Amapá conforme organização operacional da corporação.',
    sede: 'Quartel do Comando-Geral — Rua Jovino Dinoá, 3671, bairro Beirol, Macapá/AP — CEP 68.902-030',
    emergencia: '190',
    linksOficiais: ['https://pm.ap.gov.br/', 'https://pm.portal.ap.gov.br/conteudo/institucional/historia-da-pm', 'https://sead.portal.ap.gov.br/concursos/vigentes/24027', 'https://sead.portal.ap.gov.br/legislacoes'],
    fonte: 'PMAP; Governo do Amapá; SEAD/AP; Diário Oficial do Amapá; LC AP 113/2018 e LC AP 173/2025; IBGE 2025; Portal da Transparência/AP; FCC/SEAD/AP concurso Soldado PM 2022/2026',
    atualizado: 'PMAP revisada em 10/05/2026 — comando atualizado por pauta oficial de passagem de comando; efetivo, reserva e mulheres marcados como estimados; remuneração por subsídio da LC AP nº 173/2025, Anexo III, com efeitos em 01/04/2026'
  };

  REMUNERACAO_FONTES_OFICIAIS[inst] = { nome: 'PMAP, SEAD/AP e Diário Oficial do Amapá — LC AP nº 113/2018 alterada pela LC AP nº 173/2025; Tabela de Progressão Horizontal 2026 I, vigente a partir de 01/04/2026', url: 'https://editor.amapa.gov.br/arquivos_portais/publicacoes/SEAD_6df4154451d39fe1495462a15d40471c.pdf' };
  if (typeof CARGOS_PMAP !== 'undefined' && Array.isArray(CARGOS_PMAP) && CARGOS_PMAP.length) CARGOS_ESTRUTURA_GENERICAS[inst] = CARGOS_PMAP;

  CONFIGS_INSTITUICOES_GENERICAS[inst] = {
    titulo: 'PMAP',
    desc: 'Polícia Militar do Estado do Amapá',
    cor: '#1f5f3b',
    alertaPrev: 'PMAP/AP: conferir LC AP nº 113/2018, LC AP nº 173/2025, subsídio por posto/graduação e tempo de efetivo serviço, AMPRev, reserva/reforma, pensão, diárias, serviço extraordinário, alimentação, fardamento, rubricas pessoais e eventual vínculo federal de ex-território diretamente no contracheque e na norma vigente.'
  };

  CONCURSOS[inst] = {
    edital: 'PMAP — Concurso Público CFSD/QPPMC/PMAP 2022, organizado pela Fundação Carlos Chagas, para cadastro de reserva de Soldado do Quadro de Praças Policiais Militares Combatentes; em 2026 há convocações e resultados de fases pela SEAD/AP.',
    salario: 'Edital 2022: Soldado PM 2ª Classe em curso de formação R$ 2.827,00 e Soldado PM 1ª Classe R$ 5.313,18. Tabela legal vigente do portal: LC AP nº 173/2025, Anexo III, com Soldado Base R$ 6.039,13 e Aluno Soldado Base R$ 3.213,26 em 01/04/2026; conferir nível, descontos e rubricas pessoais.',
    vagas: '2.500 vagas em cadastro de reserva para Soldado PMAP, conforme edital 2022; nomeações, convocações e matrículas dependem de atos da SEAD/AP, PMAP e DOE/AP.',
    cotas: 'Conferir ampla concorrência, reserva por sexo quando aplicável, cotas legais, classificação, cadastro de reserva e retificações do edital.',
    idade: 'Edital Soldado 2022: requisitos de idade, altura, CNH, saúde, aptidão física e investigação social devem ser conferidos na versão vigente e retificações; não aplicar regra de outro estado.',
    escolaridade: 'Ensino médio completo para Soldado PM, além de requisitos de nacionalidade, CNH, altura, idoneidade, aptidão física, psicológica e saúde conforme edital.',
    materias: 'Conhecimentos Gerais, Língua Portuguesa, Matemática, História e Geografia do Amapá, Noções de Direito e legislação específica conforme edital FCC/SEAD/AP.',
    banca: 'Fundação Carlos Chagas — FCC.',
    inscritos: 'Certame em acompanhamento pela SEAD/AP, com editais de convocação, avaliação das capacidades físicas, avaliação psicológica, exame de saúde, investigação social e matrícula publicados em 2025/2026.',
    etapas: 'Prova objetiva, exame documental, avaliação das capacidades físicas, avaliação psicológica, exame de saúde, investigação social, entrega documental, matrícula e Curso de Formação de Soldados conforme edital e convocações.',
    cfsd: 'Curso de Formação de Soldados QPPMC/PMAP, com regime e regras próprias da carreira militar estadual; promoção/graduação depende de conclusão, classificação e ato administrativo.',
    estagio: 'Exercício inicial, estágio probatório/adaptação, lotação e promoções dependem de legislação militar estadual, boletins, necessidade operacional e atos da PMAP.',
    validade: 'Conferir validade, prorrogação, homologação e convocações no DOE/AP, SEAD/AP e PMAP. Não tratar como novo edital aberto sem ato posterior.',
    previsao: 'Sem novo edital aberto identificado nesta revisão; manter o concurso Soldado 2022/2026 como certame vigente/histórico com convocações e monitorar futuras autorizações oficiais.',
    site: 'https://sead.portal.ap.gov.br/concursos/vigentes/24027'
  };

  ACOES_JUDICIAIS[inst] = [
    { titulo: 'PMAP — subsídio, progressão horizontal e enquadramento', status: 'Conferência individual', ano: 'LC AP 113/2018 · LC AP 173/2025', tipo: 'individual', desc: 'Verificar posto/graduação, nível de progressão horizontal, tempo de efetivo serviço, promoções e implantação da tabela. A tabela do site orienta a conferência, mas não liquida diferenças individuais.', base: 'LC AP nº 113/2018 alterada pela LC AP nº 173/2025, DOE/AP, ficha funcional, atos de promoção/progressão e contracheques.', fonte: 'SEAD/AP / Diário Oficial do Amapá', fonteUrl: 'https://editor.amapa.gov.br/arquivos_portais/publicacoes/SEAD_6df4154451d39fe1495462a15d40471c.pdf', atualizado: 'Maio/2026' },
    { titulo: 'PMAP — diárias, alimentação, fardamento e serviço extraordinário', status: 'Depende de ato, escala e lotação', ano: 'Tema permanente', tipo: 'individual', desc: 'Conferir diárias, ajuda de custo, alimentação/etapa, fardamento, serviço extraordinário, função, lotação especial, indenizações operacionais e eventuais retroativos. Não tratar como parcela universal da tropa.', base: 'Legislação estadual, decretos, boletins, escala, ordem de serviço, ato de designação, ficha financeira e contracheque.', fonte: 'PMAP / SEAD-AP / DOE-AP', fonteUrl: 'https://pm.ap.gov.br/', atualizado: 'Maio/2026' },
    { titulo: 'PMAP — reserva, reforma, pensão militar e ex-Território', status: 'Análise individual', ano: 'Tema previdenciário e funcional', tipo: 'individual', desc: 'Amapá pode envolver militares estaduais e quadros federais oriundos do ex-Território. Não misturar tabela estadual da PMAP com remuneração federal de transposição/ex-Território sem verificar vínculo, ato e regime jurídico.', base: 'Ficha funcional, ato de ingresso/transposição, processo de reserva/reforma, AMPRev, legislação estadual e federal aplicável, contracheques e decisões individuais.', fonte: 'SEAD/AP / AMPRev / Governo Federal quando houver quadro federal', fonteUrl: 'https://www.transparencia.ap.gov.br/', atualizado: 'Maio/2026' },
    { titulo: 'Concurso PMAP 2022/2026 — convocação, fase e matrícula', status: 'Condicionado ao edital', ano: '2022/2026', tipo: 'individual', desc: 'Pode envolver avaliação documental, TAF, psicotécnico, saúde, investigação social, classificação, cotas e matrícula em curso de formação. Depende de edital, retificação, convocação e situação individual.', base: 'Edital FCC/SEAD/AP CFSD/QPPMC/PMAP 2022, retificações, editais SEAD/AP 2025/2026 e DOE/AP.', fonte: 'SEAD/AP — Concurso Soldado PM 2022', fonteUrl: 'https://sead.portal.ap.gov.br/concursos/vigentes/24027', atualizado: 'Maio/2026' }
  ];

  ASSOCIACOES[inst] = [
    { nome: 'ASMEAP — Associação dos Servidores Militares do Estado do Amapá', foco: 'Policiais militares e bombeiros militares do Amapá, ativos, veteranos e pensionistas', acao: 'Representação associativa, acompanhamento de pautas de carreira, remuneração, proteção social, promoções e condições de serviço.', site: 'Consultar canais oficiais da entidade', telefone: 'Consultar diretamente', mensalidade: 'Consultar diretamente na entidade', servicos: 'Orientação associativa, plano de saúde, atendimento jurídico, convênios e comunicação de pautas conforme informações públicas da entidade.' },
    { nome: 'ASPOMETERFA — associação vinculada a militares do Amapá e ex-Território', foco: 'Militares estaduais/federais, veteranos, pensionistas e pautas ligadas a transposição e proteção social, conforme atuação da entidade', acao: 'Acompanhamento associativo de demandas funcionais, previdenciárias e remuneratórias. Conferir escopo atualizado diretamente com a entidade.', site: 'https://www.facebook.com/ASPOMETERFA', telefone: 'Consultar diretamente', mensalidade: 'Consultar diretamente', servicos: 'Representação, orientação ao associado e acompanhamento de pautas administrativas/judiciais.' },
    { nome: 'Canais institucionais da PMAP', foco: 'Informação oficial para policiais militares, candidatos e sociedade amapaense', acao: 'Publicações, editais, serviços à tropa, notícias, batalhões, diretorias, história, comando e comunicação institucional.', site: 'https://pm.ap.gov.br/', telefone: 'Emergência 190; administrativo (96) 3212-1528 / 2101-2252', mensalidade: 'Não se aplica', servicos: 'Emergência, informações institucionais, concursos, boletins, saúde, pessoal, batalhões, notícias e comunicação oficial.' }
  ];
}

function aplicarDadosEspecificosPmal() {
  const inst = 'pmal';
  const estado = 'al';
  if (!INSTITUICOES_VALIDAS.includes(inst)) INSTITUICOES_VALIDAS.push(inst);

  HEADER_ESTADOS[estado] = {
    nome: 'Alagoas',
    sigla: 'AL',
    pm: inst,
    bm: 'bmal',
    pc: 'pcal',
    pp: 'ppal',
    flag: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira_de_Alagoas.svg'
  };
  HEADER_INSTITUICOES_INFO[inst] = { titulo: 'PMAL', desc: 'Polícia Militar do Estado de Alagoas' };
  HEADER_INSTITUICOES_IMAGENS[inst] = 'img/MILITAR/pmal.webp';
  HEADER_INSTITUICOES_RESUMO[inst] = {
    nome: 'Polícia Militar do Estado de Alagoas',
    sigla: 'PMAL',
    estado: 'Alagoas',
    estadoSigla: 'AL',
    tipo: 'Polícia Militar',
    criacao: '03/02/1832 · Decisão Imperial nº 52 e corpo policial provincial',
    ativa: 7493,
    ativaLabel: '7.493 ativos · Governo de Alagoas/PMAL 2026',
    reserva: 7308,
    reservaLabel: '7.308 inativos/reserva · estimado',
    femininas: 905,
    femininasLabel: '905 mulheres · estimado',
    populacao: 3220848,
    populacaoTitulo: 'População do Estado',
    populacaoLabel: '3.220.848 habitantes',
    relacaoLabel: '1 ativo / 430 hab. · 0,233%',
    relacaoTitulo: 'Relação ativa/população',
    governador: 'Paulo Dantas',
    comando: 'Cel QOC PM Paulo Amorim Feitosa Filho — Comandante-Geral',
    estrutura: 'Sete grandes comandos de região, batalhões, companhias, unidades administrativas, de ensino, diretorias, seções e setores, com policiamento ostensivo e preservação da ordem pública nos 102 municípios alagoanos.',
    sede: 'Avenida Assis Chateaubriand, s/n, Trapiche da Barra, Maceió/AL, CEP 57020-410',
    emergencia: '190',
    linksOficiais: [
      'https://www.pm.al.gov.br/',
      'https://www.cebraspe.org.br/concursos/pm_al_26',
      'https://central.pm.al.gov.br/sistemas/public/sislegis/publico/index/param/2',
      'https://transparencia.al.gov.br/pessoal/servidores-ativos/?codigo_orgao=12442570000110'
    ],
    fonte: 'PMAL; Governo de Alagoas; Cebraspe PM_AL_26; SAPL/ALEAL; Portal da Transparência/AL; Lei AL 7.580/2014; Lei AL 8.671/2022; Lei AL 9.852/2026; IBGE 2025',
    atualizado: 'PMAL revisada em 09/05/2026 — efetivo ativo oficial; reserva, feminino e postos sem tabela consolidada de 2026 marcados como estimados'
  };
  if (typeof REMUNERACAO_FONTES_OFICIAIS !== 'undefined') {
    REMUNERACAO_FONTES_OFICIAIS[inst] = {
      nome: 'PMAL — Edital nº 1/2026/Cebraspe para Soldado-Aluno, Soldado, Cadete e Aspirante; Lei AL nº 7.580/2014, Anexo IV, para estimativas por posto/graduação; Lei AL nº 9.852/2026 e SPSM/AL — Lei AL nº 8.671/2022',
      url: 'https://www.cebraspe.org.br/concursos/pm_al_26'
    };
  }
  if (typeof CARGOS_PMAL !== 'undefined') {
    CARGOS_ESTRUTURA_GENERICAS[inst] = CARGOS_PMAL;
  }
  CONFIGS_INSTITUICOES_GENERICAS[inst] = {
    titulo: 'PMAL',
    desc: 'Polícia Militar do Estado de Alagoas',
    cor: '#1f4f7a',
    alertaPrev: 'PMAL/SPSM-AL: conferir contribuição de 10,5%, base de cálculo, subsídio, nível, serviço voluntário, indenizações e rubricas pessoais no contracheque e na Lei AL 8.671/2022.'
  };
  CONCURSOS[inst] = CONCURSOS[inst] || {
    edital: 'PMAL 2026 — Edital nº 1/PMAL, de 19/03/2026, para admissão ao CFO e CFP, executado pelo Cebraspe, SEPLAG/AL e PMAL.',
    salario: 'CFO: Cadete 1º ano R$ 3.874,43; Cadete 2º ano R$ 4.163,78; Cadete 3º ano R$ 4.716,51; Aspirante após CFO R$ 11.563,77. CFP: Soldado-Aluno R$ 2.354,67; Soldado após CFP R$ 6.067,51.',
    vagas: '530 vagas imediatas + cadastro de reserva: Oficial 30 imediatas + 30 CR; Soldado 500 imediatas + 500 CR.',
    cotas: 'Distribuição por ampla concorrência e reserva para pessoas pretas, pardas, indígenas ou quilombolas conforme edital PMAL 2026.',
    idade: '18 anos completos na matrícula e máximo de 30 anos até a data limite de inscrição, com exceção prevista no edital para integrante da PMAL no QOEM.',
    escolaridade: 'Ensino médio completo, CNH categoria B, nacionalidade, altura mínima, aptidão física, sanidade física/mental, idoneidade e demais requisitos do edital.',
    materias: 'Provas objetivas e discursiva com conhecimentos básicos, específicos e legislação pertinente ao policial militar de Alagoas, conforme conteúdo programático do edital.',
    banca: 'Cebraspe.',
    inscritos: 'Inscrições de 30/03/2026 a 30/04/2026, taxa R$ 150,00, pagamento até 05/05/2026; provas objetivas e discursiva previstas para 19/07/2026 em Arapiraca/AL e Maceió/AL.',
    etapas: 'Provas objetivas, prova discursiva, teste de aptidão física, avaliação médica, avaliação psicológica, comprovação documental, investigação social, exame toxicológico e procedimento de heteroidentificação/verificação quando aplicável.',
    cfsd: 'CFO para Oficial de Estado-Maior e CFP para Soldado do Quadro de Praças, em regime de dedicação integral, conforme edital e normas da Diretoria de Ensino/PMAL.',
    estagio: 'Curso de formação, nomeação, estágio probatório e desenvolvimento na carreira seguem edital, Estatuto dos Policiais Militares de Alagoas e atos da PMAL/SEPLAG.',
    validade: 'Conforme edital PMAL 2026 e atos de homologação/prorrogação que forem publicados.',
    previsao: 'Há edital PMAL 2026 em andamento; não publicar novo concurso aberto sem fonte oficial posterior.',
    site: 'https://www.cebraspe.org.br/concursos/pm_al_26'
  };
  ASSOCIACOES[inst] = ASSOCIACOES[inst] || [
    {
      nome: 'AMEAL — Associação dos Militares do Estado de Alagoas',
      foco: 'Policiais e bombeiros militares de Alagoas, ativos, veteranos e pensionistas, conforme regras de associação.',
      acao: 'Representação associativa, orientação institucional, pautas remuneratórias, apoio administrativo/jurídico e comunicação de interesse da classe.',
      site: 'https://ameal.org.br',
      telefone: 'Consultar diretamente na entidade',
      mensalidade: 'Consultar diretamente na entidade',
      servicos: 'Jurídico, notícias de classe, convênios, orientação ao associado e acompanhamento de temas de carreira.'
    },
    {
      nome: 'Entidades representativas de praças e oficiais da PMAL',
      foco: 'Militares estaduais de Alagoas por posto, graduação, quadro ou situação funcional.',
      acao: 'Acompanhamento de demandas administrativas, remuneratórias, previdenciárias e de valorização profissional.',
      site: 'https://www.pm.al.gov.br/',
      telefone: 'Consultar canais oficiais e entidades locais',
      mensalidade: 'Consultar diretamente na entidade',
      servicos: 'Orientação, comunicação institucional, convênios e encaminhamento de demandas coletivas.'
    }
  ];
  ACOES_JUDICIAIS[inst] = ACOES_JUDICIAIS[inst] || [
    {
      titulo: 'Subsídio PMAL — enquadramento por posto/graduação e nível',
      status: 'Conferência individual',
      ano: 'Lei AL 7.580/2014 e revisões posteriores',
      tipo: 'individual',
      desc: 'Verificar enquadramento no subsídio, nível I/II, evolução, promoções e diferenças remuneratórias. Não tratar como ganho automático.',
      base: 'Lei AL nº 7.580/2014, leis de revisão remuneratória e atos de promoção/enquadramento.',
      fonte: 'Lei AL 7.580/2014; SAPL/ALEAL; Portal da Transparência/AL; contracheque',
      fonteUrl: 'https://sapl.al.al.leg.br/',
      atualizado: 'Maio/2026'
    },
    {
      titulo: 'SPSM/AL — contribuição, inatividade e pensão militar',
      status: 'Análise previdenciária/proteção social',
      ano: '2022 em diante',
      tipo: 'individual',
      desc: 'Conferir base de cálculo, alíquota, verbas indenizatórias excluídas, tempo de serviço, reserva/reforma e regras de pensão conforme situação funcional.',
      base: 'Lei AL nº 8.671/2022, Decreto-Lei 667/1969, Lei Federal 13.954/2019 e atos estaduais.',
      fonte: 'Lei AL 8.671/2022',
      fonteUrl: 'https://sapl.al.al.leg.br/norma/2283',
      atualizado: 'Maio/2026'
    },
    {
      titulo: 'Serviço voluntário remunerado / Força Tarefa / indenizações',
      status: 'Conferência de escala e rubrica',
      ano: '2014/2017 em diante',
      tipo: 'individual/coletivo',
      desc: 'Possível discussão sobre pagamento, escala, limite, natureza indenizatória e reflexos de rubricas vinculadas a serviço extraordinário ou força-tarefa.',
      base: 'Lei AL nº 7.581/2014, Decreto AL nº 35.142/2014, Lei AL nº 7.952/2017 e atos administrativos aplicáveis.',
      fonte: 'PMAL/Sislegis; Diário Oficial/AL',
      fonteUrl: 'https://central.pm.al.gov.br/sistemas/public/sislegis/publico/index/param/2',
      atualizado: 'Maio/2026'
    },
    {
      titulo: 'Concurso PMAL 2026 — etapas, cotas, TAF, saúde e investigação social',
      status: 'Controle de edital',
      ano: '2026',
      tipo: 'individual',
      desc: 'Demandas podem envolver eliminação em fase objetiva/discursiva, TAF, saúde, psicológico, investigação social, heteroidentificação, documentação e prazos.',
      base: 'Edital nº 1 — PMAL, de 19/03/2026, Lei AL nº 5.346/1992, Lei AL nº 6.568/2005 e Lei Federal nº 14.751/2023.',
      fonte: 'Cebraspe PM_AL_26',
      fonteUrl: 'https://www.cebraspe.org.br/concursos/pm_al_26',
      atualizado: 'Maio/2026'
    }
  ];
}


function aplicarDadosEspecificosPcal() {
  const inst = 'pcal';
  const estado = 'al';
  if (!INSTITUICOES_VALIDAS.includes(inst)) INSTITUICOES_VALIDAS.push(inst);

  HEADER_ESTADOS[estado] = {
    nome: 'Alagoas',
    sigla: 'AL',
    pm: 'pmal',
    bm: 'bmal',
    pc: inst,
    pp: 'ppal',
    flag: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira_de_Alagoas.svg'
  };
  HEADER_INSTITUICOES_INFO[inst] = { titulo: 'PCAL', desc: 'Polícia Civil do Estado de Alagoas' };
  HEADER_INSTITUICOES_IMAGENS[inst] = 'img/CIVIL/pcal.webp';
  HEADER_INSTITUICOES_RESUMO[inst] = {
    nome: 'Polícia Civil do Estado de Alagoas',
    sigla: 'PCAL',
    estado: 'Alagoas',
    estadoSigla: 'AL',
    tipo: 'Polícia Civil',
    criacao: '25/06/1975 · Lei AL nº 3.437 estrutura cargos da Polícia Civil; origem administrativa anterior na estrutura policial civil de 1912',
    ativa: 2000,
    ativaLabel: 'cerca de 2.000 integrantes (estimado) · portal PCAL',
    reserva: 0,
    reservaLabel: 'Dados em breve',
    femininas: 0,
    femininasLabel: 'Dados em breve',
    populacao: 3220848,
    populacaoTitulo: 'População do Estado',
    populacaoLabel: '3.220.848 habitantes',
    relacaoLabel: '1 ativo / 1.610 hab. · 0,062% (estimado)',
    relacaoTitulo: 'Relação ativa/população',
    governador: 'Paulo Dantas',
    comando: 'Delegado Thales Silva Araújo — Delegado-Geral interino',
    estrutura: 'Delegacia-Geral, Delegado-Geral Adjunto, diretorias de polícia judiciária, DRACCO, corregedoria, diretoria administrativa, unidades metropolitanas/interior, delegacias especializadas, regionais, Academia de Polícia de Alagoas e serviços de apoio.',
    sede: 'Avenida General de França Albuquerque (AL-101 Norte), Jacarecica, Maceió/AL, CEP 57038-640',
    emergencia: '197 · Delegacia Virtual/SINESP e canais PCAL',
    linksOficiais: [
      'https://pc.al.gov.br/',
      'https://pc.al.gov.br/institucional',
      'https://pc.al.gov.br/delegacias-e-contatos',
      'https://gestaointegrada.seplag.al.gov.br/',
      'https://alagoas.al.gov.br/noticia/governo-de-alagoas-divulga-comissoes-dos-concursos-da-policia-civil-e-fapeal'
    ],
    fonte: 'PCAL; Governo de Alagoas; SEPLAG/AL Gestão Integrada; SAPL/ALEAL; Diário Oficial/AL; Lei AL 3.437/1975; Lei AL 6.441/2003; Lei AL 7.602/2014; Lei AL 8.641/2022; Lei AL 9.551/2025; IBGE 2025',
    atualizado: 'PCAL revisada em 09/05/2026 — efetivo ativo como ordem de grandeza institucional; reserva, gênero e tabela sem fonte direta marcados como Dados em breve/estimados'
  };
  if (typeof REMUNERACAO_FONTES_OFICIAIS !== 'undefined') {
    REMUNERACAO_FONTES_OFICIAIS[inst] = {
      nome: 'PCAL — Leis AL nº 6.276/2001, nº 6.277/2001 e nº 7.602/2014 para Agente/Escrivão; Lei AL nº 8.641/2022 para Delegado; Lei AL nº 9.551/2025 revisão geral; valores sem tabela consolidada 2026 marcados como estimados',
      url: 'https://gestaointegrada.seplag.al.gov.br/'
    };
  }
  if (typeof CARGOS_PCAL !== 'undefined') {
    CARGOS_ESTRUTURA_GENERICAS[inst] = CARGOS_PCAL;
  }
  CONFIGS_INSTITUICOES_GENERICAS[inst] = {
    titulo: 'PCAL',
    desc: 'Polícia Civil do Estado de Alagoas',
    cor: '#4b5563',
    alertaPrev: 'PCAL/AL Previdência/IPASEAL Saúde: conferir RPPS, contribuição, abono de permanência, aposentadoria policial, subsídio, plantões, acúmulo extraordinário e rubricas pessoais no contracheque e na norma vigente.'
  };
  CONCURSOS[inst] = CONCURSOS[inst] || {
    edital: 'PCAL 2026 — comissão formada para novo concurso de Agente e Escrivão; 300 vagas previstas, sendo 150 imediatas e 150 cadastro de reserva; edital e banca em definição.',
    salario: 'Agente/Escrivão: referência inicial R$ 5.318,61 e final até R$ 15.065,12 (estimado por tabela de carreira/revisões). Delegado: tabela específica pela Lei AL 8.641/2022; novo edital de Delegado não publicado nesta revisão.',
    vagas: '300 vagas previstas para Agente e Escrivão: 150 imediatas + 150 cadastro de reserva.',
    cotas: 'A definir em edital, observadas a legislação estadual/federal e eventuais regras de reserva.',
    idade: 'A definir no edital. Não fixar limite sem edital publicado.',
    escolaridade: 'Agente/Escrivão: nível superior; Agente costuma exigir CNH B conforme legislação/edital; Delegado exige bacharelado em Direito nos certames próprios.',
    materias: 'Estrutura esperada: Português, Raciocínio Lógico, Informática/segurança cibernética, Direitos Humanos, Atualidades/Ética, Direito Penal, Processo Penal, Constitucional, Administrativo, legislação estadual e legislação penal especial.',
    banca: 'A definir; último concurso Agente/Escrivão 2021 foi Cebraspe.',
    inscritos: 'Sem inscrições abertas nesta revisão; comissão formada em janeiro/2026 e banca em definição.',
    etapas: 'Objetivas, discursiva, TAF, prova prática de digitação quando aplicável, exames médicos/laboratoriais, psicológica, investigação social, curso de formação; Delegado pode ter prova oral/títulos conforme edital.',
    cfsd: 'Curso de Formação Policial na Academia de Polícia de Alagoas/APOCAL.',
    estagio: 'Estágio probatório, posse e exercício conforme estatuto estadual, Lei Orgânica Nacional das Polícias Civis e edital.',
    validade: 'A definir no edital.',
    previsao: 'Concurso autorizado/comissão formada; não publicar como edital aberto até sair ato oficial.',
    site: 'https://pc.al.gov.br/'
  };
  ASSOCIACOES[inst] = ASSOCIACOES[inst] || [
    {
      nome: 'SINDPOL-AL — Sindicato dos Policiais Civis de Alagoas',
      foco: 'Agentes, escrivães e demais policiais civis de Alagoas conforme base sindical.',
      acao: 'Representação sindical, pautas remuneratórias, condições de trabalho, defesa institucional, comunicação e apoio jurídico/sindical.',
      site: 'https://sindpolalagoas.com.br/',
      telefone: 'Consultar site/canais da entidade',
      mensalidade: 'Consultar diretamente na entidade',
      servicos: 'Jurídico, notícias de classe, mobilização, convênios, atendimento ao filiado e acompanhamento de legislação.'
    },
    {
      nome: 'ADEPOL-AL — Associação dos Delegados de Polícia de Alagoas',
      foco: 'Delegados de Polícia Civil de Alagoas.',
      acao: 'Representação associativa, defesa institucional da carreira, comunicação, apoio jurídico e acompanhamento de pautas de delegados.',
      site: 'https://adepol-al.com.br/portal/',
      telefone: 'Consultar diretamente na entidade',
      mensalidade: 'Consultar diretamente na entidade',
      servicos: 'Notícias, representação institucional, apoio jurídico, convênios e orientação ao associado.'
    },
    {
      nome: 'PCAL — canais institucionais',
      foco: 'Cidadãos, servidores e unidades da Polícia Civil de Alagoas.',
      acao: 'Atendimento institucional, localização de delegacias, contatos oficiais e informações públicas.',
      site: 'https://pc.al.gov.br/',
      telefone: '(82) 3315-7722 / (82) 3315-2625',
      mensalidade: 'Não se aplica',
      servicos: 'Delegacias e contatos, delegacia virtual, notícias, serviços digitais e orientação pública.'
    }
  ];
  ACOES_JUDICIAIS[inst] = ACOES_JUDICIAIS[inst] || [
    {
      titulo: 'Subsídio Agente/Escrivão PCAL — enquadramento, progressão e revisões',
      status: 'Conferência individual',
      ano: '2001/2014 em diante',
      tipo: 'individual',
      desc: 'Verificar classe, nível, referência, progressão, revisão geral, atraso de implantação e diferenças em ficha financeira/contracheque. Não tratar como ganho automático.',
      base: 'Leis AL nº 6.276/2001, nº 6.277/2001, nº 7.602/2014, nº 9.032/2023, nº 9.551/2025 e atos de progressão/enquadramento.',
      fonte: 'SEPLAG/AL Gestão Integrada; SAPL/ALEAL; contracheque',
      fonteUrl: 'https://gestaointegrada.seplag.al.gov.br/',
      atualizado: 'Maio/2026'
    },
    {
      titulo: 'Delegado PCAL — subsídio, classe DPC-1 a DPC-4 e acúmulo extraordinário',
      status: 'Conferência individual',
      ano: '2022/2025 em diante',
      tipo: 'individual',
      desc: 'Conferir classe, enquadramento, revisão, designação, acúmulo extraordinário, atos publicados e rubricas do contracheque.',
      base: 'Lei AL nº 8.641/2022, Lei AL nº 9.592/2025, atos de designação e ficha financeira.',
      fonte: 'SAPL/ALEAL; Diário Oficial/AL; contracheque',
      fonteUrl: 'https://sapl.al.al.leg.br/norma/2234',
      atualizado: 'Maio/2026'
    },
    {
      titulo: 'Aposentadoria policial, abono de permanência e paridade/integralidade',
      status: 'Análise previdenciária individual',
      ano: 'EC 103/2019 e regras policiais',
      tipo: 'individual',
      desc: 'Exige análise da data de ingresso, idade, tempo policial, tempo total, cargo, regra de transição, ato de aposentadoria, abono de permanência e regime próprio.',
      base: 'LC nº 51/1985, LC nº 144/2014, EC nº 103/2019, Lei Complementar Estadual nº 52/2019, AL Previdência e registros funcionais.',
      fonte: 'Legislação previdenciária e AL Previdência',
      fonteUrl: 'https://alprevidencia.al.gov.br/',
      atualizado: 'Maio/2026'
    },
    {
      titulo: 'Concurso PCAL 2026 — comissão, edital, etapas, TAF e prova prática',
      status: 'Controle de edital',
      ano: '2026',
      tipo: 'individual/coletivo',
      desc: 'Demandas podem envolver publicação de edital, banca, requisitos, cotas, TAF, digitação, psicológico, investigação social, curso de formação, cronograma e eliminação em fases.',
      base: 'Ato de comissão do Governo de Alagoas, edital futuro e legislação da carreira policial civil.',
      fonte: 'Governo de Alagoas — comissões dos concursos PCAL e Fapeal',
      fonteUrl: 'https://alagoas.al.gov.br/noticia/governo-de-alagoas-divulga-comissoes-dos-concursos-da-policia-civil-e-fapeal',
      atualizado: 'Maio/2026'
    },
    {
      titulo: 'Plantões, diárias, adicional noturno, acúmulo e rubricas eventuais',
      status: 'Conferência de escala e rubrica',
      ano: 'Caso a caso',
      tipo: 'individual',
      desc: 'Verificar escala, ordem de serviço, designação, cumprimento efetivo, natureza indenizatória/remuneratória, reflexos e pagamento no contracheque.',
      base: 'Leis estaduais, atos da PCAL/SEPLAG, escala, portaria de designação, Diário Oficial e ficha financeira.',
      fonte: 'PCAL/SEPLAG/DOE-AL',
      fonteUrl: 'https://pc.al.gov.br/',
      atualizado: 'Maio/2026'
    }
  ];
}

function criarOptionInstituicao(inst, texto) {
  const opt = document.createElement('option');
  opt.value = inst;
  opt.textContent = texto;
  return opt;
}

function compararTextoPtBr(a, b) {
  return String(a || '').localeCompare(String(b || ''), 'pt-BR', { sensitivity: 'base' });
}

function getEstadosOrdenadosPorNome() {
  return Object.entries(HEADER_ESTADOS || {})
    .filter(([uf, estado]) => estado && !['br', 'municipal'].includes(uf))
    .sort(([, estadoA], [, estadoB]) => compararTextoPtBr(estadoA?.nome, estadoB?.nome));
}

function ordenarOptgroupsInstituicoes(select) {
  if (!select) return;
  const placeholder = Array.from(select.childNodes).find(node => node.nodeType === Node.ELEMENT_NODE && node.tagName === 'OPTION' && node.value === '');
  const grupos = Array.from(select.querySelectorAll('optgroup')).sort((a, b) => {
    const especiais = { 'Federais': -2, 'União': -2 };
    const prioridadeA = Object.prototype.hasOwnProperty.call(especiais, a.label) ? especiais[a.label] : 0;
    const prioridadeB = Object.prototype.hasOwnProperty.call(especiais, b.label) ? especiais[b.label] : 0;
    if (prioridadeA !== prioridadeB) return prioridadeA - prioridadeB;
    return compararTextoPtBr(a.label, b.label);
  });

  const fragmento = document.createDocumentFragment();
  if (placeholder) fragmento.appendChild(placeholder);
  grupos.forEach(grupo => fragmento.appendChild(grupo));
  select.appendChild(fragmento);
}


function getRotuloRamoSelect(ramo, inst, info = {}) {
  if (ramo === 'bm') return 'Bombeiros Militares';
  if (ramo === 'pc') return 'Polícia Civil';
  if (ramo === 'pp') return 'Polícia Penal';
  if (inst === 'pmrs' || /Brigada Militar/i.test(info.desc || '')) return 'Brigada Militar';
  return 'Polícia Militar';
}

function montarSelectInstituicoes(select) {
  if (!select || select.dataset.instituicoesMontadas === 'true') return;

  const valorAtual = select.value;
  const fragmento = document.createDocumentFragment();
  const placeholder = criarOptionInstituicao('', 'Escolha uma instituição');
  placeholder.disabled = true;
  placeholder.selected = true;
  fragmento.appendChild(placeholder);

  getEstadosOrdenadosPorNome().forEach(([uf, estado]) => {
    const grupo = document.createElement('optgroup');
    grupo.label = estado.nome || String(uf).toUpperCase();

    ['pm', 'bm', 'pc', 'pp'].forEach(ramo => {
      const inst = estado[ramo];
      if (!inst) return;
      const info = HEADER_INSTITUICOES_INFO[inst] || {};
      const titulo = info.titulo || String(inst).toUpperCase();
      const rotulo = getRotuloRamoSelect(ramo, inst, info);
      grupo.appendChild(criarOptionInstituicao(inst, `${titulo} - ${rotulo}`));
    });

    if (grupo.children.length) fragmento.appendChild(grupo);
  });

  select.innerHTML = '';
  select.appendChild(fragmento);
  select.dataset.instituicoesMontadas = 'true';

  if (valorAtual && Array.from(select.options || []).some(opt => opt.value === valorAtual)) {
    select.value = valorAtual;
  }
}

function montarSelectsInstituicoes() {
  document.querySelectorAll('#instituicao, #instituicao_header, #instituicao_home').forEach(montarSelectInstituicoes);
}

function prepararSelectInstituicaoHome() {
  const seletor = document.getElementById('instituicao_home');
  if (!seletor) return;

  montarSelectInstituicoes(seletor);
  const primeiraOpcao = seletor.options && seletor.options[0];
  if (primeiraOpcao) {
    primeiraOpcao.disabled = false;
    primeiraOpcao.selected = true;
    primeiraOpcao.textContent = 'Escolha uma Instituição';
    primeiraOpcao.value = '';
  }
  seletor.value = '';
}

function selecionarInstituicaoPaginaInicial(inst) {
  const valor = String(inst || '').trim();
  if (!valor) {
    aplicarHeaderInicialPortal();
    prepararSelectInstituicaoHome();
    return;
  }

  mudarInstituicao(valor);
  atualizarVisibilidadeResumoInstitucional('principal');
  const info = HEADER_INSTITUICOES_INFO[valor];
  if (info) mostrarToast(`${info.titulo} selecionada no resumo da página inicial.`);
}

function aplicarEstruturaEstadosFaltantesNoHtml() {
  montarSelectsInstituicoes();

  const montarOptgroups = select => {
    if (!select) return;
    ESTADOS_ESTRUTURA_FALTANTES.forEach(estado => {
      if (Array.from(select.options || []).some(opt => opt.value === estado.pm)) return;
      const grupo = document.createElement('optgroup');
      grupo.label = estado.nome;
      grupo.appendChild(criarOptionInstituicao(estado.pm, `${estado.pmSigla} - Polícia Militar`));
      grupo.appendChild(criarOptionInstituicao(estado.pc, `${estado.pcSigla} - Polícia Civil`));
      grupo.appendChild(criarOptionInstituicao(estado.pp, `${estado.ppSigla} - Polícia Penal`));
      select.appendChild(grupo);
    });
  };

  ['instituicao_header', 'instituicao', 'instituicao_home'].forEach(id => {
    const seletor = document.getElementById(id);
    montarOptgroups(seletor);
    ordenarOptgroupsInstituicoes(seletor);
  });

  const flags = document.querySelector('.header-state-flags');
  if (flags) {
    ESTADOS_ESTRUTURA_FALTANTES.forEach(estado => {
      if (flags.querySelector(`[data-estado="${estado.estado}"]`)) return;
      const btn = document.createElement('button');
      btn.className = 'state-flag';
      btn.type = 'button';
      btn.dataset.estado = estado.estado;
      btn.title = estado.nome;
      btn.setAttribute('aria-label', `Selecionar ${estado.nome}`);
      btn.setAttribute('aria-pressed', 'false');
      btn.onclick = () => selecionarEstado(estado.estado);
      btn.innerHTML = `<img src="${escapeHtml(estado.flag)}" alt="" aria-hidden="true"><span>${escapeHtml(estado.sigla)}</span>`;
      flags.appendChild(btn);
    });
  }

  aplicarEstruturaBombeirosMilitaresNoHtml();
  aplicarEstruturaFederaisNoHtml();
}



/* ============================================================ */
/* === REVISÃO DOS RESUMOS INSTITUCIONAIS ====================== */
/* ============================================================ */
const RESUMO_DADOS_EM_BREVE = 'Dados em breve';

const RESUMO_GOVERNADORES_UF_2026 = {
  ac: 'Mailza Assis',
  al: 'Paulo Dantas',
  ap: 'Clécio Luís',
  am: 'Roberto Cidade',
  ba: 'Jerônimo Rodrigues',
  ce: 'Elmano de Freitas',
  df: 'Celina Leão',
  es: 'Ricardo Ferraço',
  go: 'Daniel Vilela',
  ma: 'Carlos Brandão Júnior',
  mt: 'Otaviano Pivetta',
  ms: 'Eduardo Riedel',
  mg: 'Mateus Simões',
  pa: 'Hana Ghassan',
  pb: 'Lucas Ribeiro',
  pr: 'Ratinho Júnior',
  pe: 'Raquel Lyra',
  pi: 'Rafael Fonteles',
  rj: 'Ricardo Couto de Castro (governador em exercício)',
  rn: 'Fátima Bezerra',
  rs: 'Eduardo Leite',
  ro: 'Marcos Rocha',
  rr: 'Soldado Sampaio (interino)',
  sc: 'Jorginho Mello',
  sp: 'Tarcísio de Freitas',
  se: 'Fábio Mitidieri',
  to: 'Wanderlei Barbosa'
};

function resumoEhDadoPendente(valor) {
  if (valor === undefined || valor === null) return true;
  if (typeof valor === 'number') return !Number.isFinite(valor) || valor === 0;
  const texto = String(valor).trim();
  if (!texto || texto === '#' || texto === '-' || texto === '—') return true;
  return /\b(a preencher|preencher|a confirmar|não informado|nao informado|estrutura .*criada|preenchimento|pendente|consultar diretamente|consultar site oficial|fonte oficial a preencher|fontes oficiais .* preencher|comando\/direção atual|chefe do executivo|efetivo ativo — preencher|reserva\/inativos — preencher|integrantes femininas — preencher|relação ativa|relação ativo\/população — preencher)\b/i.test(texto);
}

function resumoValorOuEmBreve(valor) {
  return resumoEhDadoPendente(valor) ? RESUMO_DADOS_EM_BREVE : valor;
}

function resumoInferirTipo(inst, dados = {}) {
  if (dados.tipo && !resumoEhDadoPendente(dados.tipo)) return dados.tipo;
  if (/^bm/i.test(inst)) return 'Bombeiro Militar';
  if (/^pm/i.test(inst) || inst === 'pmerj') return 'Polícia Militar';
  if (/^pc/i.test(inst) || inst === 'pcerj') return 'Polícia Civil';
  if (/^pp/i.test(inst)) return 'Polícia Penal';
  if (inst === 'pf') return 'Polícia Federal';
  if (inst === 'prf') return 'Polícia Rodoviária Federal';
  return RESUMO_DADOS_EM_BREVE;
}

function resumoInstituicoesEstaduais() {
  const pares = [];
  Object.entries(HEADER_ESTADOS || {}).forEach(([uf, estado]) => {
    if (uf === 'br') return;
    ['pm', 'bm', 'pc', 'pp'].forEach(ramo => {
      if (estado && estado[ramo]) pares.push({ uf, ramo, inst: estado[ramo], estado });
    });
  });
  return pares;
}

function aplicarRevisaoResumosInstitucionais() {
  const pares = resumoInstituicoesEstaduais();

  pares.forEach(({ uf, ramo, inst, estado }) => {
    const info = HEADER_INSTITUICOES_INFO[inst] || {};
    const dados = HEADER_INSTITUICOES_RESUMO[inst] || {};
    const governadorAtual = RESUMO_GOVERNADORES_UF_2026[uf];
    const nome = !resumoEhDadoPendente(dados.nome) ? dados.nome : (info.desc || RESUMO_DADOS_EM_BREVE);
    const sigla = !resumoEhDadoPendente(dados.sigla) ? dados.sigla : (info.titulo || String(inst || '').toUpperCase() || RESUMO_DADOS_EM_BREVE);

    HEADER_INSTITUICOES_RESUMO[inst] = {
      ...dados,
      nome,
      sigla,
      estado: resumoValorOuEmBreve(dados.estado || estado?.nome),
      estadoSigla: resumoValorOuEmBreve(dados.estadoSigla || estado?.sigla),
      tipo: resumoInferirTipo(inst, dados),
      criacao: resumoValorOuEmBreve(dados.criacao),
      ativaLabel: !resumoEhDadoPendente(dados.ativaLabel) ? dados.ativaLabel : (resumoEhDadoPendente(dados.ativa) ? RESUMO_DADOS_EM_BREVE : ''),
      reservaLabel: !resumoEhDadoPendente(dados.reservaLabel) ? dados.reservaLabel : (resumoEhDadoPendente(dados.reserva) ? RESUMO_DADOS_EM_BREVE : ''),
      femininasLabel: !resumoEhDadoPendente(dados.femininasLabel) ? dados.femininasLabel : (resumoEhDadoPendente(dados.femininas) ? RESUMO_DADOS_EM_BREVE : ''),
      populacaoTitulo: dados.populacaoTitulo || (ramo === 'pp' ? 'Presos atendidos' : 'População do Estado'),
      populacaoLabel: !resumoEhDadoPendente(dados.populacaoLabel) ? dados.populacaoLabel : (resumoEhDadoPendente(dados.populacao) ? RESUMO_DADOS_EM_BREVE : ''),
      relacaoTitulo: dados.relacaoTitulo || (ramo === 'pp' ? 'Relação ativa/presos' : 'Relação ativa/população'),
      relacaoLabel: !resumoEhDadoPendente(dados.relacaoLabel) ? dados.relacaoLabel : (!resumoEhDadoPendente(dados.populacao) && !resumoEhDadoPendente(dados.ativa) ? '' : RESUMO_DADOS_EM_BREVE),
      governador: governadorAtual || resumoValorOuEmBreve(dados.governador),
      comando: resumoValorOuEmBreve(dados.comando),
      fonte: resumoValorOuEmBreve(dados.fonte),
      atualizado: dados.atualizado && !resumoEhDadoPendente(dados.atualizado)
        ? `${dados.atualizado} · Revisado em 02/05/2026`
        : 'Revisado em 02/05/2026'
    };

    ['ativaLabel', 'reservaLabel', 'femininasLabel', 'populacaoLabel', 'relacaoLabel'].forEach(chave => {
      if (HEADER_INSTITUICOES_RESUMO[inst][chave] === '') delete HEADER_INSTITUICOES_RESUMO[inst][chave];
    });
  });

  // Também normaliza estruturas federais que o site mantém fora das 108 estaduais.
  ['pf', 'prf'].forEach(inst => {
    if (!HEADER_INSTITUICOES_RESUMO[inst]) return;
    const dados = HEADER_INSTITUICOES_RESUMO[inst];
    Object.keys(dados).forEach(chave => {
      if (chave.endsWith('Titulo')) return;
      if (chave === 'populacao' || chave === 'ativa' || chave === 'reserva' || chave === 'femininas') return;
      dados[chave] = resumoValorOuEmBreve(dados[chave]);
    });
    dados.populacaoLabel = resumoValorOuEmBreve(dados.populacaoLabel || dados.populacao);
    dados.atualizado = dados.atualizado && !resumoEhDadoPendente(dados.atualizado)
      ? dados.atualizado
      : 'Revisado em 03/05/2026';
  });
}

aplicarEstruturaEstadosFaltantesDados();
aplicarDadosEspecificosPmal();
aplicarDadosEspecificosPmap();
aplicarDadosEspecificosPcal();
aplicarEstruturaBombeirosMilitaresDados();
aplicarDadosEspecificosBmac();
aplicarDadosEspecificosBmal();
aplicarDadosEspecificosBmam();




function aplicarDadosEspecificosBmms() {
  const inst = 'bmms';
  const populacaoMs = 2924631;
  const efetivoLegal = 3978;
  const relacao = Math.round(populacaoMs / efetivoLegal);
  HEADER_INSTITUICOES_INFO[inst] = { titulo: 'CBMMS', desc: 'Corpo de Bombeiros Militar de Mato Grosso do Sul' };
  HEADER_INSTITUICOES_IMAGENS[inst] = 'img/BOMBEIRO/bmms.webp';
  HEADER_INSTITUICOES_RESUMO[inst] = {
    nome: 'Corpo de Bombeiros Militar de Mato Grosso do Sul',
    sigla: 'CBMMS',
    siglaInterna: 'BMMS',
    estado: 'Mato Grosso do Sul',
    estadoSigla: 'MS',
    tipo: 'Bombeiro Militar',
    criacao: '16/04/1973 · Lei MT nº 3.322 · origem histórica',
    ativa: efetivoLegal,
    ativaLabel: '3.978 cargos fixados em lei · LC MS nº 354/2025',
    reserva: 0,
    reservaLabel: 'Dados em breve',
    femininas: 0,
    femininasLabel: 'Dados em breve',
    efetivoTotalLabel: '3.978 cargos fixados em lei · LC MS nº 354/2025',
    populacao: populacaoMs,
    populacaoLabel: '2.924.631 habitantes (estimado IBGE 2025)',
    populacaoTitulo: 'População do Estado',
    relacaoLabel: `1 cargo legal / ${relacao.toLocaleString('pt-BR')} hab. (estimado) · 0,136% (estimado)`,
    relacaoTitulo: 'Relação efetivo legal/população',
    governador: 'Eduardo Corrêa Riedel',
    comando: 'Cel QOBM Frederico Reis Pouso Salas — Comandante-Geral',
    estrutura: 'Comando-Geral, Subcomando-Geral, Estado-Maior-Geral, diretorias, coordenadorias, grupamentos e subgrupamentos bombeiro militar, unidades operacionais especializadas, atividades técnicas, ensino, logística e resposta a emergências.',
    sede: 'Rua Fernando Augusto Corrêa da Costa, nº 376 — Jardim América, Campo Grande/MS — CEP 79080-790',
    emergencia: '193',
    linksOficiais: [
      'https://www.bombeiros.ms.gov.br/',
      'https://www.bombeiros.ms.gov.br/comando/comandante-geral/',
      'https://legislacao.bombeiros.ms.gov.br/',
      'https://www.concursos.ms.gov.br/'
    ],
    fonte: 'CBMMS; Governo de MS; Portal da Legislação MS; Normas internas CBMMS; LC MS 127/2008, LC MS 188/2014, LC MS 291/2021, LC MS 354/2025, Lei MS 6.562/2026; IBGE 2025; concursos.ms.gov.br',
    atualizado: 'CBMMS revisado em 07/05/2026 — efetivo exibido como cargo legal; população e relação marcadas como estimadas; remuneração cadastrada por subsídio e nível com RGA 2026'
  };

  CONFIGS_INSTITUICOES_GENERICAS[inst] = {
    titulo: 'CBMMS',
    desc: 'Corpo de Bombeiros Militar de Mato Grosso do Sul',
    cor: '#b91c1c',
    alertaPrev: 'CBMMS/MS: conferir subsídio por posto/graduação e nível, SPSM/MS, AGEPREV/MS, ajuda de custo, fardamento, indenizações, função, escala, rubricas pessoais e base de contribuição diretamente no contracheque e na norma vigente.'
  };

  if (typeof CARGOS_BMMS !== 'undefined' && Array.isArray(CARGOS_BMMS) && CARGOS_BMMS.length) {
    CARGOS_ESTRUTURA_GENERICAS[inst] = CARGOS_BMMS;
  }

  CONCURSOS[inst] = {
    edital: 'CBMMS — Processo Seletivo Simplificado SAD/SEJUSP/CBMMS/QPTBM/2025 para Quadro de Praças Temporárias; concursos efetivos anteriores/homologados devem ser conferidos em concursos.ms.gov.br e DOE/MS.',
    salario: 'Tabela de remuneração do portal: subsídio militar estadual por posto/graduação e nível com RGA 2026; valores de edital de formação devem ser conferidos no edital específico.',
    vagas: 'QPTBM/2025: conferir editais complementares no portal oficial. Efetivo legal da corporação: 3.978 cargos pela LC MS nº 354/2025.',
    cotas: 'Conforme edital específico e legislação estadual aplicável.',
    idade: 'Conforme edital específico, Lei MS nº 3.808/2009 e alterações.',
    escolaridade: 'Conforme edital específico; para ingresso operacional, conferir exigência de ensino médio/superior conforme carreira e curso.',
    materias: 'Conforme conteúdo programático do edital específico.',
    banca: 'Portal oficial de concursos do Governo de Mato Grosso do Sul; banca/organizadora conforme edital.',
    inscritos: 'Acompanhar cronograma no portal concursos.ms.gov.br e publicações do DOE/MS.',
    etapas: 'Prova quando prevista, TAF, avaliação psicológica, exame médico, investigação social, prova de títulos/documental e curso de formação conforme edital.',
    cfsd: 'Curso de Formação de Soldados/Praças Bombeiro Militar conforme edital de ingresso ou seleção temporária.',
    estagio: 'Conforme Estatuto dos Militares Estaduais de MS e edital específico.',
    validade: 'Conforme edital específico.',
    previsao: 'Não publicar novo concurso efetivo aberto sem fonte oficial. Manter destaque para editais vigentes no portal oficial de concursos de MS.',
    site: 'https://www.concursos.ms.gov.br/'
  };

  ASSOCIACOES[inst] = [
    { nome: 'ABMMS — Associação dos Bombeiros Militares de Mato Grosso do Sul', foco: 'Bombeiros militares estaduais de Mato Grosso do Sul', acao: 'Representação associativa, acompanhamento de pautas da categoria, apoio institucional e comunicação de interesse dos bombeiros militares.', site: 'Dados em breve', telefone: 'Consultar diretamente na entidade', mensalidade: 'Consultar diretamente na entidade', servicos: 'Orientação associativa, comunicação institucional, eventual apoio jurídico e convênios conforme estatuto/contrato.' },
    { nome: 'ACS/MS — Associação e Centro Social dos Policiais Militares e Bombeiros Militares de MS', foco: 'Praças e militares estaduais de Mato Grosso do Sul', acao: 'Representação associativa de militares estaduais, acompanhamento de carreira, remuneração, proteção social e condições de trabalho.', site: 'https://acsms.org.br/', telefone: 'Consultar diretamente na entidade', mensalidade: 'Consultar diretamente na entidade', servicos: 'Comunicação de pautas, convênios, orientação associativa e apoio ao associado conforme regras internas.' },
    { nome: 'Canais oficiais do CBMMS', foco: 'Bombeiros militares, candidatos e sociedade', acao: 'Informação institucional, prevenção, legislação, concursos, atividades técnicas e notícias oficiais.', site: 'https://www.bombeiros.ms.gov.br/', telefone: '193 · (67) 3357-9400', mensalidade: 'Não se aplica', servicos: 'Emergência, prevenção, legislação, cursos, concursos, notícias e atendimento administrativo conforme unidade.' }
  ];

  ACOES_JUDICIAIS[inst] = [
    { titulo: 'Subsídio militar MS — nível, referência e enquadramento', status: 'Conferência individual', ano: 'LC 127/2008, LC 291/2021 e Lei 6.562/2026', tipo: 'individual', desc: 'Conferir se posto/graduação, nível, tempo de carreira, promoção, enquadramento e RGA foram aplicados corretamente no contracheque. Não tratar como diferença automática.', base: 'LC MS nº 127/2008; LC MS nº 291/2021; Lei MS nº 6.562/2026.', fonte: 'Portal da Legislação MS / Normas internas CBMMS', fonteUrl: 'https://legislacao.bombeiros.ms.gov.br/tabelas-de-subsidios/', atualizado: 'Maio/2026' },
    { titulo: 'Ajuda de custo, fardamento, diárias e indenizações', status: 'Conferência administrativa/judicial conforme caso', ano: 'Legislação estadual vigente', tipo: 'individual', desc: 'Verificar pagamento, base de cálculo e natureza das parcelas indenizatórias ou eventuais, conforme escala, designação, missão, curso e ato administrativo.', base: 'Estatuto dos Militares Estaduais de MS; LC MS nº 291/2021; normas internas do CBMMS; DOE/MS.', fonte: 'CBMMS / DOE-MS', fonteUrl: 'https://legislacao.bombeiros.ms.gov.br/', atualizado: 'Maio/2026' },
    { titulo: 'SPSM/MS, AGEPREV/MS, reserva remunerada e reforma', status: 'Possível revisão individual', ano: 'Regime vigente', tipo: 'individual', desc: 'Conferir contribuição, base de cálculo, tempo de serviço, regras de passagem para reserva/reforma, pensão militar e eventual averbação. Depende da data de ingresso e situação funcional.', base: 'Legislação estadual de proteção social dos militares de MS; LC MS nº 053/1990 e alterações; normas previdenciárias estaduais.', fonte: 'AGEPREV/MS / Portal da Legislação MS', fonteUrl: 'https://www.ageprev.ms.gov.br/', atualizado: 'Maio/2026' },
    { titulo: 'Promoção, antiguidade, merecimento e interstício', status: 'Análise individual ou coletiva conforme ato', ano: 'Normas de carreira', tipo: 'individual/coletivo', desc: 'Conferir publicações de promoção, interstícios, cursos, vagas por efetivo legal e critérios de antiguidade/merecimento. Não há ganho automático sem ato e documentação.', base: 'LC MS nº 188/2014; LC MS nº 354/2025; estatuto e normas internas do CBMMS.', fonte: 'CBMMS / Portal da Legislação MS', fonteUrl: 'https://legislacao.bombeiros.ms.gov.br/', atualizado: 'Maio/2026' },
    { titulo: 'Licença especial, férias não gozadas e conversão em pecúnia', status: 'Possível cobrança individual', ano: 'Conforme histórico funcional', tipo: 'individual', desc: 'Verificar períodos adquiridos, não usufruídos e não indenizados, especialmente em passagem para reserva/reforma ou desligamento.', base: 'Estatuto dos Militares Estaduais de MS; jurisprudência aplicável; atos funcionais individuais.', fonte: 'Portal da Legislação MS / ficha funcional', fonteUrl: 'https://aacpdappls.net.ms.gov.br/appls/legislacao/secoge/govato.nsf', atualizado: 'Maio/2026' }
  ];
}

function aplicarDadosEspecificosBmmg() {
  const inst = 'bmmg';
  const estado = 'mg';
  const efetivoAtivo = 5370;
  const populacaoMg = 21393441;
  const relacaoHab = Math.round(populacaoMg / efetivoAtivo);

  if (!HEADER_ESTADOS[estado]) {
    HEADER_ESTADOS[estado] = { nome: 'Minas Gerais', sigla: 'MG', flag: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira_de_Minas_Gerais.svg' };
  }
  HEADER_ESTADOS[estado].bm = inst;
  HEADER_ESTADOS[estado].bombeiro = inst;

  if (typeof INSTITUICOES_VALIDAS !== 'undefined' && Array.isArray(INSTITUICOES_VALIDAS) && !INSTITUICOES_VALIDAS.includes(inst)) {
    INSTITUICOES_VALIDAS.push(inst);
  }

  HEADER_INSTITUICOES_INFO[inst] = { titulo: 'CBMMG', desc: 'Corpo de Bombeiros Militar de Minas Gerais' };
  HEADER_INSTITUICOES_IMAGENS[inst] = 'img/BOMBEIRO/bmmg.webp';

  HEADER_INSTITUICOES_RESUMO[inst] = {
    nome: 'Corpo de Bombeiros Militar de Minas Gerais',
    sigla: 'CBMMG',
    siglaInterna: 'BMMG',
    estado: 'Minas Gerais',
    estadoSigla: 'MG',
    tipo: 'Bombeiro Militar',
    criacao: '31/08/1911 · Lei MG nº 557',
    ativa: efetivoAtivo,
    ativaLabel: '5.370 ativos (estimado)',
    reserva: 0,
    reservaLabel: 'Dados em breve',
    femininas: 0,
    femininasLabel: '7.999 cargos fixados em lei · Lei MG 22.415/2016',
    efetivoTotalLabel: '7.999 cargos fixados em lei · Lei MG 22.415/2016',
    populacao: populacaoMg,
    populacaoTitulo: 'População do Estado',
    populacaoLabel: '21.393.441 habitantes (estimado IBGE 2025)',
    relacaoLabel: `1 ativo / ${relacaoHab.toLocaleString('pt-BR')} hab. (estimado) · 0,025% (estimado)`,
    relacaoTitulo: 'Relação ativa/população',
    governador: 'Mateus Simões de Almeida',
    comando: 'Cel BM Jordana de Oliveira Filgueiras Daldegan — Comandante-Geral',
    estrutura: 'Comando-Geral, Estado-Maior, Academia de Bombeiros Militar, comandos operacionais, batalhões, companhias e frações; presença em 100 municípios, com prevenção e combate a incêndios, salvamento, atendimento pré-hospitalar, defesa civil e segurança contra incêndio e pânico.',
    sede: 'Belo Horizonte/MG — sede administrativa estadual do CBMMG',
    emergencia: '193',
    coberturaLabel: 'Presença operacional em 100 municípios mineiros e atendimento estadual pelo telefone 193.',
    ocorrenciasLabel: 'Dados operacionais, vistorias, incêndios, salvamentos, APH, defesa civil e prevenção devem ser atualizados por relatórios oficiais do CBMMG.',
    linksOficiais: [
      'https://www.bombeiros.mg.gov.br/',
      'https://www.bombeiros.mg.gov.br/concursos',
      'https://www.mg.gov.br/instituicao_unidade/corpo-de-bombeiros-militar-do-estado-de-minas-gerais-cbmmg',
      'https://www.almg.gov.br/legislacao-mineira/'
    ],
    fonte: 'CBMMG; Governo de Minas Gerais; ALMG; SEPLAG/MG; Editais CBMMG 09/2026 e 10/2026; IBGE 2025; IDECAN; Lei MG 25.804/2026',
    atualizado: 'CBMMG revisado em 07/05/2026 — efetivo ativo e relação ativa/população marcados como estimativa; remuneração tabelada com referência 2026 e valores de ingresso dos editais oficiais.'
  };

  if (typeof REMUNERACAO_FONTES_OFICIAIS !== 'undefined') {
    REMUNERACAO_FONTES_OFICIAIS[inst] = {
      nome: 'MG/SEPLAG — Grupo XI — Defesa Social — Lei MG nº 25.804/2026; CBMMG Editais nº 09/2026 e nº 10/2026',
      url: 'https://www.mg.gov.br/system/files/media/planejamento/documento_detalhado/2026/grupo_11_atualizacao-54-2026.pdf'
    };
  }

  if (typeof CARGOS_BMMG !== 'undefined' && Array.isArray(CARGOS_BMMG) && CARGOS_BMMG.length) {
    CARGOS_ESTRUTURA_GENERICAS[inst] = CARGOS_BMMG;
  }

  CONFIGS_INSTITUICOES_GENERICAS[inst] = {
    titulo: 'CBMMG',
    desc: 'Corpo de Bombeiros Militar de Minas Gerais',
    cor: '#b91c1c',
    alertaPrev: 'CBMMG/MG: conferir IPSM, contribuição previdenciária, ajuda de custo para alimentação, abono fardamento, curso/quadro, retroativos e demais rubricas no contracheque. Não tratar valor de edital como total individual automático.'
  };

  CONCURSOS[inst] = {
    edital: 'CBMMG — Editais nº 09/2026 (CFO BM 2027) e nº 10/2026 (CFSd BM 2027), publicados em 16/03/2026.',
    salario: 'CFO: Cadete R$ 7.506,80; 2º Tenente R$ 11.547,07. CFSd: Soldado 2ª Classe R$ 4.562,30 durante o curso; Soldado 1ª Classe R$ 5.332,60 após formação. Benefícios conforme edital: abono fardamento, assistência médico-hospitalar, psicológica, odontológica e auxílio-alimentação quando devido.',
    vagas: '342 vagas: 321 para CFSd BM 2027 e 21 para CFO BM 2027.',
    cotas: 'Conferir reserva de vagas e critérios nos editais e retificações oficiais.',
    idade: '18 a 30 anos, observada a data e regra específica do edital.',
    escolaridade: 'Nível superior: bacharelado, licenciatura, tecnólogo ou curso sequencial, conforme o cargo/edital.',
    materias: 'Conforme edital IDECAN/CBMMG: conteúdos gerais, conhecimentos específicos, legislação, redação/prova discursiva quando prevista e anexos de conteúdo programático.',
    banca: 'IDECAN.',
    inscritos: 'Inscrições previstas de 18/05/2026 a 17/06/2026.',
    etapas: 'Prova objetiva/discursiva conforme cargo, TCF/TAF, habilidades natatórias, exames de saúde, avaliação psicológica, investigação social/documental e matrícula no curso.',
    cfsd: 'CFSd BM 2027 para Soldado; CFO BM 2027 para Oficial, com formação na Academia de Bombeiros Militar.',
    estagio: 'Estágio probatório e evolução funcional conforme Estatuto dos Militares de Minas Gerais e atos do CBMMG.',
    validade: 'Conferir edital, homologação e eventual prorrogação oficial.',
    previsao: 'Há editais oficiais 2026 para ingresso 2027. Não publicar novo edital aberto sem fonte oficial posterior.',
    site: 'https://www.bombeiros.mg.gov.br/concursos'
  };

  ASSOCIACOES[inst] = [
    { nome: 'ASPRA/PMBM-MG — Associação dos Praças Policiais e Bombeiros Militares de Minas Gerais', foco: 'Praças da PMMG e do CBMMG', acao: 'Representação de classe, apoio institucional, comunicação, orientação jurídica e pautas remuneratórias.', site: 'https://aspra.org.br/', telefone: 'Consultar diretamente na entidade', mensalidade: 'Consultar diretamente na entidade', servicos: 'Jurídico, notícias de classe, convênios, atendimento ao associado e comunicação institucional.' },
    { nome: 'AOPMBM-MG — Associação dos Oficiais da Polícia Militar e do Corpo de Bombeiros Militar de Minas Gerais', foco: 'Oficiais da PMMG e do CBMMG', acao: 'Representação institucional, valorização da carreira, pautas remuneratórias e apoio associativo.', site: 'https://www.aopmbm.org.br/', telefone: 'Consultar diretamente na entidade', mensalidade: 'Consultar diretamente na entidade', servicos: 'Comunicação, eventos, apoio associativo, convênios e orientação ao associado.' },
    { nome: 'IPSM — Instituto de Previdência dos Servidores Militares de Minas Gerais', foco: 'Saúde e previdência dos militares estaduais e dependentes', acao: 'Canal institucional para assistência à saúde, previdência, pensionistas e dependentes.', site: 'https://www.ipsm.mg.gov.br/', telefone: 'Consultar canais oficiais do IPSM', mensalidade: 'Contribuição conforme regra legal; conferir contracheque', servicos: 'Assistência à saúde, previdência militar, pensionistas, rede credenciada e informações ao beneficiário.' }
  ];

  ACOES_JUDICIAIS[inst] = [
    { titulo: 'CBMMG — revisão geral 5,4% e tabela 2026', status: 'Conferência individual', ano: 'Lei MG 25.804/2026', tipo: 'individual', desc: 'Comparar posto/graduação, implantação da revisão geral de 5,4%, retroativos e rubricas no contracheque. Não tratar como ganho automático.', base: 'Lei MG nº 25.804/2026; tabela SEPLAG/MG Grupo XI; ficha financeira e contracheque.', fonte: 'ALMG / SEPLAG-MG', fonteUrl: 'https://www.almg.gov.br/legislacao-mineira/texto/LEI/25804/2026/', atualizado: 'Maio/2026' },
    { titulo: 'CBMMG — ajuda de custo para alimentação', status: 'Conferência de pagamento', ano: 'Decreto MG 49.006/2025', tipo: 'individual', desc: 'Verificar pagamento por dia efetivamente trabalhado, regras de afastamento, escala, unidade e rubrica. Não somar automaticamente ao bruto.', base: 'Decreto MG nº 49.006/2025; editais CBMMG; contracheques.', fonte: 'ALMG / CBMMG', fonteUrl: 'https://www.almg.gov.br/legislacao-mineira/texto/DEC/49006/2025/', atualizado: 'Maio/2026' },
    { titulo: 'CBMMG — IPSM, contribuição e assistência à saúde', status: 'Conferência previdenciária/assistencial', ano: 'Tema permanente', tipo: 'individual', desc: 'Conferir contribuição previdenciária, contribuição de saúde, dependentes, descontos e rede assistencial, conforme situação funcional.', base: 'Regime dos militares estaduais de Minas Gerais; normas do IPSM; ficha financeira e contracheque.', fonte: 'IPSM/MG', fonteUrl: 'https://www.ipsm.mg.gov.br/', atualizado: 'Maio/2026' },
    { titulo: 'CBMMG — promoção, curso, quadro e enquadramento', status: 'Verificar caso concreto', ano: 'Lei MG 5.301/1969 e Lei MG 22.415/2016', tipo: 'individual', desc: 'Analisar curso de formação, posto/graduação, quadro, promoção, antiguidade, merecimento, matrícula e eventual atraso administrativo.', base: 'Lei MG nº 5.301/1969; Lei MG nº 22.415/2016; Lei Federal nº 14.751/2023; editais CBMMG.', fonte: 'ALMG / CBMMG', fonteUrl: 'https://www.almg.gov.br/legislacao-mineira/', atualizado: 'Maio/2026' }
  ];
}


function aplicarDadosEspecificosBmpr() {
  const inst = 'bmpr';
  const estado = 'pr';
  const efetivoAtivo = 3146;
  const populacaoPr = 11890517;
  const relacaoHab = Math.round(populacaoPr / efetivoAtivo);
  const relacaoPct = ((efetivoAtivo / populacaoPr) * 100).toFixed(3).replace('.', ',');

  if (!HEADER_ESTADOS[estado]) {
    HEADER_ESTADOS[estado] = { nome: 'Paraná', sigla: 'PR', flag: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira_do_Paran%C3%A1.svg' };
  }
  HEADER_ESTADOS[estado].pm = HEADER_ESTADOS[estado].pm || 'pmpr';
  HEADER_ESTADOS[estado].bm = inst;
  HEADER_ESTADOS[estado].bombeiro = inst;

  if (typeof INSTITUICOES_VALIDAS !== 'undefined' && Array.isArray(INSTITUICOES_VALIDAS) && !INSTITUICOES_VALIDAS.includes(inst)) {
    INSTITUICOES_VALIDAS.push(inst);
  }

  HEADER_INSTITUICOES_INFO[inst] = { titulo: 'CBMPR', desc: 'Corpo de Bombeiros Militar do Paraná' };
  HEADER_INSTITUICOES_IMAGENS[inst] = 'img/BOMBEIRO/bmpr.webp';

  HEADER_INSTITUICOES_RESUMO[inst] = {
    nome: 'Corpo de Bombeiros Militar do Paraná',
    sigla: 'CBMPR',
    siglaInterna: 'BMPR',
    estado: 'Paraná',
    estadoSigla: 'PR',
    tipo: 'Bombeiro Militar',
    criacao: '23/03/1912 · Lei PR nº 1.133',
    ativa: efetivoAtivo,
    ativaLabel: '3.146 ativos · ref. CBMPR 12/2025',
    reserva: 0,
    reservaLabel: 'Dados em breve',
    femininas: 0,
    femininasLabel: '5.704 cargos fixados em lei · Lei PR 22.916/2025',
    efetivoTotalLabel: '5.704 cargos fixados em lei · Lei PR 22.916/2025',
    populacao: populacaoPr,
    populacaoTitulo: 'População do Estado',
    populacaoLabel: '11.890.517 habitantes (estimado IBGE 2025)',
    relacaoLabel: `1 ativo / ${relacaoHab.toLocaleString('pt-BR')} hab. (estimado) · ${relacaoPct}% (estimado)`,
    relacaoTitulo: 'Relação ativa/população',
    governador: 'Carlos Massa Ratinho Junior',
    comando: 'Cel QOBM Antônio Geraldo Hiller Lino — Comandante-Geral',
    estrutura: 'Comando-Geral, Subcomando-Geral, Estado-Maior, Coordenadoria Estadual do SIATE, Divisão de Administração e Finanças, Ajudância, Assessoria Jurídica, cinco Comandos Regionais e 20 unidades operacionais.',
    sede: 'Rua Nunes Machado, nº 100 — Centro, Curitiba/PR — CEP 80.250-000',
    emergencia: '193',
    coberturaLabel: 'Cinco Comandos Regionais e 20 unidades operacionais no Estado; atendimento emergencial pelo 193.',
    ocorrenciasLabel: 'Ocorrências, vistorias, incêndios, salvamentos, SIATE, defesa civil e ações preventivas devem ser atualizadas por relatórios oficiais do CBMPR.',
    linksOficiais: [
      'https://www.bombeiros.pr.gov.br/',
      'https://www.bombeiros.pr.gov.br/Pagina/Comando-Geral-do-Corpo-de-Bombeiros',
      'https://www.bombeiros.pr.gov.br/Pagina/Historico-do-Corpo-de-Bombeiros-Militar-do-Parana',
      'https://www.bombeiros.pr.gov.br/Pagina/Concursos',
      'https://www.administracao.pr.gov.br/Recursos-Humanos/Pagina/Carreiras-e-Tabelas-Salariais'
    ],
    fonte: 'CBMPR; Administração/PR — Carreiras e Tabelas Salariais; Legislação/PR; ParanáPrevidência; FASPM; IBGE/AEN; Lei PR 1.133/1912; Lei PR 22.187/2024; Lei PR 22.916/2025; concursos CBMPR 2025.',
    atualizado: 'CBMPR revisado em 07/05/2026 — população e relação ativa/população marcadas como estimadas; remuneração tabelada conforme Administração/PR e Lei PR 22.187/2024.'
  };

  if (typeof REMUNERACAO_FONTES_OFICIAIS !== 'undefined') {
    REMUNERACAO_FONTES_OFICIAIS[inst] = {
      nome: 'Administração/PR — Carreiras e Tabelas Salariais — Quadro do Bombeiro Militar do Paraná — Lei PR nº 22.187/2024; auxílio-alimentação Lei PR nº 22.208/2024',
      url: 'https://www.administracao.pr.gov.br/Recursos-Humanos/Pagina/Carreiras-e-Tabelas-Salariais'
    };
  }

  if (typeof CARGOS_BMPR !== 'undefined' && Array.isArray(CARGOS_BMPR) && CARGOS_BMPR.length) {
    CARGOS_ESTRUTURA_GENERICAS[inst] = CARGOS_BMPR;
  }

  CONFIGS_INSTITUICOES_GENERICAS[inst] = {
    titulo: 'CBMPR',
    desc: 'Corpo de Bombeiros Militar do Paraná',
    cor: '#b91c1c',
    alertaPrev: 'CBMPR/ParanáPrevidência/FASPM: conferir contribuição militar, FASPM facultativo, auxílio-alimentação, classe, posto/graduação, diárias, indenizações e demais rubricas no contracheque. Não tratar valor de edital como remuneração total individual.'
  };

  CONCURSOS[inst] = {
    edital: 'CBMPR — Concursos 2025: Soldado Bombeiro Militar, Edital nº 01/2025, IBFC, 600 vagas; Cadete Bombeiro Militar, Concurso Público nº 01/2025, Instituto AOCP, 20 vagas.',
    salario: 'Soldado: página oficial de ingresso informa Soldado 2ª Classe R$ 2.530,12 e Soldado 1ª Classe R$ 5.839,11; tabela Administração/PR julho/2025 mostra Soldado 1ª Classe Classe I em R$ 6.101,87. Cadete 1º ano: R$ 3.994,86; 2º Tenente: R$ 11.163,91 na página oficial de ingresso, com tabela de carreira própria no portal.',
    vagas: 'Soldado BM 2025: 600 vagas. Cadete BM 2025: 20 vagas. Posse de 851 novos soldados divulgada pelo CBMPR para maio/2026.',
    cotas: 'Conferir regras de reserva, ampla concorrência e critérios de desempate nos editais IBFC/AOCP e retificações oficiais.',
    idade: 'Soldado: máximo de 30 anos, curso superior e CNH categoria B, conforme página oficial de ingresso. Cadete: conferir edital AOCP/CBMPR.',
    escolaridade: 'Nível superior para Soldado BM; Cadete conforme edital do concurso e página oficial de ingresso.',
    materias: 'Prova objetiva, exames de capacidade física, avaliação psicológica, investigação social, avaliação de saúde e demais fases conforme edital IBFC/AOCP.',
    banca: 'IBFC para Soldado Bombeiro Militar 2025; Instituto AOCP para Cadete Bombeiro Militar 2025.',
    inscritos: 'Concursos 2025 com páginas oficiais no CBMPR; acompanhar editais, convocações, resultados e posse nos sites das bancas.',
    etapas: 'Prova objetiva, exame de capacidade física, avaliação psicológica, investigação social, avaliação de saúde, documentação, matrícula e curso de formação, conforme edital.',
    cfsd: 'Soldado BM realiza curso de formação; Cadete BM realiza CFO/Curso de Formação de Oficiais conforme edital e normas da corporação.',
    estagio: 'Estágio probatório e evolução funcional conforme Código da Polícia Militar do Paraná, legislação aplicada ao CBMPR e atos da corporação.',
    validade: 'Conferir edital, homologação e eventual prorrogação oficial.',
    previsao: 'Não publicar novo concurso aberto sem fonte oficial posterior. Destaque atual: concursos 2025 de Soldado e Cadete Bombeiro Militar.',
    site: 'https://www.bombeiros.pr.gov.br/Pagina/Concursos'
  };

  ASSOCIACOES[inst] = [
    { nome: 'AVM — Associação da Vila Militar', foco: 'Militares estaduais do Paraná, ativos, veteranos, pensionistas e familiares', acao: 'Representação associativa, orientação de classe, comunicação institucional e apoio ao associado.', site: 'https://www.avmpmpr.com.br/', telefone: 'Consultar canais oficiais da entidade', mensalidade: 'Consultar diretamente na entidade', servicos: 'Atendimento associativo, comunicação, convênios, orientação e apoio conforme regulamento interno.' },
    { nome: 'AMAI — Associação de Defesa dos Militares Estaduais Ativos, Inativos e Pensionistas do Paraná', foco: 'Militares estaduais do Paraná e pensionistas', acao: 'Atuação associativa em pautas remuneratórias, previdenciárias, administrativas e de carreira.', site: 'Consultar canais oficiais da entidade', telefone: 'Consultar diretamente na entidade', mensalidade: 'Consultar diretamente na entidade', servicos: 'Representação, orientação associativa e eventual apoio jurídico conforme contrato/estatuto.' },
    { nome: 'FASPM — Fundo de Atendimento à Saúde dos Policiais Militares e Bombeiros Militares', foco: 'Militares estaduais do Paraná e dependentes elegíveis', acao: 'Assistência à saúde de adesão facultativa, conforme lei estadual e regras do fundo.', site: 'https://www.faspm.pr.gov.br/', telefone: 'Consultar canais oficiais do FASPM', mensalidade: 'Contribuição facultativa conforme Lei PR 17.169/2012', servicos: 'Rede assistencial, atendimento à saúde, orientação de dependentes e regras de contribuição.' },
    { nome: 'Canais institucionais do CBMPR', foco: 'Bombeiros militares, candidatos e sociedade paranaense', acao: 'Informações oficiais, concursos, prevenção, serviços técnicos, notícias e orientações institucionais.', site: 'https://www.bombeiros.pr.gov.br/', telefone: '193 · contatos administrativos conforme unidade', mensalidade: 'Não se aplica', servicos: 'Concursos, notícias, prevenção, vistorias, atividades técnicas, emergência e comunicação institucional.' }
  ];

  ACOES_JUDICIAIS[inst] = [
    { titulo: 'CBMPR — subsídio por classe e enquadramento', status: 'Conferência individual', ano: 'Lei PR 22.187/2024', tipo: 'individual', desc: 'Verificar se posto/graduação, classe, promoção, implantação do subsídio e reflexos foram aplicados corretamente. Não tratar como ganho automático.', base: 'Lei PR 22.187/2024, Anexo I, Tabela I; ficha funcional; atos de promoção; contracheques.', fonte: 'Administração/PR — Carreiras e Tabelas Salariais', fonteUrl: 'https://www.administracao.pr.gov.br/Recursos-Humanos/Pagina/Carreiras-e-Tabelas-Salariais', atualizado: 'Maio/2026' },
    { titulo: 'CBMPR — auxílio-alimentação', status: 'Conferência individual', ano: 'Lei PR 22.208/2024', tipo: 'individual', desc: 'Conferir elegibilidade, valor mensal de R$ 834,74 e eventual lançamento no contracheque; verba não foi somada automaticamente à tabela de subsídio.', base: 'Lei PR 20.937/2021, alterações da Lei PR 22.208/2024 e tabelas Administração/PR.', fonte: 'Administração/PR / Legislação PR', fonteUrl: 'https://www.administracao.pr.gov.br/Recursos-Humanos/Pagina/Carreiras-e-Tabelas-Salariais', atualizado: 'Maio/2026' },
    { titulo: 'CBMPR — FASPM facultativo', status: 'Conferência individual', ano: 'Lei PR 17.169/2012', tipo: 'individual', desc: 'Verificar adesão, contribuição de titular/dependentes, limite, cobertura e descontos. O FASPM é facultativo e depende de situação individual.', base: 'Lei PR 17.169/2012, art. 15 e normas do FASPM.', fonte: 'Legislação PR / FASPM', fonteUrl: 'https://www.legislacao.pr.gov.br/legislacao/pesquisarAto.do?action=exibir&codAto=67717&indice=1&totalRegistros=1', atualizado: 'Maio/2026' },
    { titulo: 'CBMPR — contribuição militar / proteção social', status: 'Possível revisão conforme caso concreto', ano: 'Lei Federal 13.954/2019', tipo: 'individual', desc: 'Conferir base de cálculo e alíquota de contribuição militar, inclusive inatividade e pensão, conforme situação funcional e regras do ParanáPrevidência.', base: 'Lei Federal 13.954/2019; orientações ParanáPrevidência; contracheque e ato de inatividade/pensão.', fonte: 'ParanáPrevidência', fonteUrl: 'https://www.paranaprevidencia.pr.gov.br/', atualizado: 'Maio/2026' },
    { titulo: 'CBMPR — efetivo, promoções e carreira', status: 'Análise funcional', ano: 'Leis PR 22.916/2025 e 23.103/2026', tipo: 'individual', desc: 'Promoções, interstícios, vagas, quadro de acesso, agregação, reserva/reforma e reenquadramentos dependem de data de ingresso, quadro, cursos, ficha funcional e boletins.', base: 'Lei PR 1.943/1954; Leis PR 5.940/1969 e 5.944/1969; Lei PR 22.916/2025; Lei PR 23.103/2026; atos do CBMPR.', fonte: 'Legislação PR / CBMPR', fonteUrl: 'https://www.legislacao.pr.gov.br/', atualizado: 'Maio/2026' }
  ];
}

function aplicarDadosEspecificosBmrj() {
  const inst = 'bmrj';
  const estado = 'rj';
  const efetivoAtivo = 12916;
  const populacaoRj = 17223547;
  const relacaoHab = Math.round(populacaoRj / efetivoAtivo);

  if (!HEADER_ESTADOS[estado]) {
    HEADER_ESTADOS[estado] = { nome: 'Rio de Janeiro', sigla: 'RJ', flag: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira_do_estado_do_Rio_de_Janeiro.svg' };
  }
  HEADER_ESTADOS[estado].bm = inst;
  HEADER_ESTADOS[estado].bombeiro = inst;

  if (typeof INSTITUICOES_VALIDAS !== 'undefined' && Array.isArray(INSTITUICOES_VALIDAS) && !INSTITUICOES_VALIDAS.includes(inst)) {
    INSTITUICOES_VALIDAS.push(inst);
  }

  HEADER_INSTITUICOES_INFO[inst] = { titulo: 'CBMERJ', desc: 'Corpo de Bombeiros Militar do Estado do Rio de Janeiro' };
  HEADER_INSTITUICOES_IMAGENS[inst] = 'img/BOMBEIRO/bmrj.webp';

  HEADER_INSTITUICOES_RESUMO[inst] = {
    nome: 'Corpo de Bombeiros Militar do Estado do Rio de Janeiro',
    sigla: 'CBMERJ',
    estado: 'Rio de Janeiro',
    estadoSigla: 'RJ',
    tipo: 'Bombeiro Militar',
    criacao: '02/07/1856 · Decreto Imperial nº 1.775',
    ativa: efetivoAtivo,
    ativaLabel: '12.916 ativos · ref. Anuário CBMERJ 2024',
    reserva: 0,
    reservaLabel: 'Dados em breve',
    femininas: 0,
    femininasLabel: 'Dados em breve',
    populacao: populacaoRj,
    populacaoTitulo: 'População do Estado',
    populacaoLabel: '17.223.547 habitantes (estimado IBGE 2025)',
    relacaoLabel: `1 ativo / ${relacaoHab.toLocaleString('pt-BR')} hab. (estimado) · 0,075% (estimado)`,
    relacaoTitulo: 'Relação ativa/população',
    governador: 'Cláudio Castro',
    comando: 'Cel BM Tarciso Antonio de Salles Junior — Secretário de Estado de Defesa Civil e Comandante-Geral',
    estrutura: 'SEDEC/CBMERJ com Estado-Maior Geral, diretorias gerais e setoriais, Comandos de Bombeiro de Área I–X, unidades de ensino, saúde, grupamentos operacionais, marítimos, ambientais, aéreos e especializados.',
    sede: 'Praça da República, nº 45 — Centro, Rio de Janeiro/RJ — CEP 20.211-350',
    emergencia: '193',
    coberturaLabel: 'Atuação estadual em prevenção, combate a incêndios, salvamento, atendimento pré-hospitalar, defesa civil e emergências pelo 193.',
    ocorrenciasLabel: 'Ocorrências operacionais, vistorias, incêndios, salvamentos, resgates, apoio a eventos e ações preventivas devem ser atualizadas por relatórios do CBMERJ e SEDEC/RJ.',
    linksOficiais: [
      'https://www.cbmerj.rj.gov.br/',
      'https://www.cbmerj.rj.gov.br/cursos-e-concursos/',
      'https://www.cbmerj.rj.gov.br/sobre-o-cbmerj/institucional/estrutura/',
      'https://www.defesacivil.rj.gov.br/'
    ],
    fonte: 'CBMERJ; SEDEC/RJ; GESPERJ Caderno de Remuneração janeiro/2026; IBGE 2025; IDECAN/CBMERJ; Decreto Imperial nº 1.775/1856',
    atualizado: 'CBMERJ revisado em 07/05/2026 — efetivo ativo conforme Anuário CBMERJ 2024; população do RJ marcada como estimada; reserva/inativos e efetivo feminino em Dados em breve.'
  };

  if (typeof REMUNERACAO_FONTES_OFICIAIS !== 'undefined') {
    REMUNERACAO_FONTES_OFICIAIS[inst] = {
      nome: 'GESPERJ/RJ — Caderno de Remuneração — janeiro/2026 — SEDEC/CBMERJ',
      url: 'https://www.rj.gov.br/gesperj/sites/default/files/Caderno%20de%20Remunera%C3%A7%C3%A3o%20-%20janeiro%20-%202026.pdf'
    };
  }

  if (typeof CARGOS_BMRJ !== 'undefined' && Array.isArray(CARGOS_BMRJ) && CARGOS_BMRJ.length) {
    CARGOS_ESTRUTURA_GENERICAS[inst] = CARGOS_BMRJ;
  }

  CONFIGS_INSTITUICOES_GENERICAS[inst] = {
    titulo: 'CBMERJ',
    desc: 'Corpo de Bombeiros Militar do Estado do Rio de Janeiro',
    cor: '#b5121b',
    alertaPrev: 'CBMERJ/RJ: conferir SPSMERJ/RioPrevidência, GRET, GHP, GRAM, triênio quando aplicável, auxílio-transporte, PTTC e demais rubricas no contracheque. Não tratar soldo como remuneração total.'
  };

  CONCURSOS[inst] = {
    edital: 'ABMDPII/CFO 2026 em andamento/finalização; Soldado BM QBMP 1 — Busca e Salvamento, edital BMRJ-QBMP 01/2025, em andamento no IDECAN/CBMERJ.',
    salario: 'CFO 2026: aluno com vencimento inicial de R$ 4.227,16; após formação, aspirante com remuneração bruta de R$ 9.313,32 (estimado). Soldado QBMP 1: edital informa R$ 2.956,40 durante formação e R$ 5.233,38 após o curso; tabela SEDEC jan/2026 indica Soldado A/B/C em R$ 5.233,88.',
    vagas: 'CFO 2026: 50 vagas para Oficial Combatente. Soldado BM QBMP 1: 144 vagas, sendo 101 ampla concorrência, 29 negros/indígenas e 14 hipossuficientes.',
    cotas: 'Soldado QBMP 1: 10% para hipossuficiência econômica e 20% para candidatos negros e indígenas, conforme edital. CFO: conferir edital específico.',
    idade: 'Regra geral de ingresso conforme legislação estadual e edital específico do CBMERJ.',
    escolaridade: 'CFO e Soldado QBMP 1: ensino médio completo, conforme editais localizados.',
    materias: 'CFO: prova objetiva e redação; Soldado QBMP 1: prova objetiva conforme edital IDECAN. Conferir anexo de conteúdo do edital vigente.',
    banca: 'UERJ para a primeira fase do CFO 2026; IDECAN para Soldado BM QBMP 1 — Busca e Salvamento.',
    inscritos: 'CFO 2026: inscrições de 06/01/2026 a 18/01/2026. Soldado QBMP 1: inscrições de 11/06/2025 a 07/07/2025 e certame em andamento.',
    etapas: 'CFO: prova objetiva, redação, TAF, exame documental, inspeção de saúde, pesquisa social e THE. Soldado QBMP 1: exame intelectual, TAF, THE, exame de saúde, exame documental e títulos.',
    cfsd: 'Soldado QBMP 1 realiza curso de formação de Soldado BM após aprovação. CFO realiza Curso de Formação de Oficiais na ABMDPII.',
    estagio: 'Dados em breve — conferir Estatuto, edital e normas internas sobre estágio probatório/adaptação.',
    validade: 'Soldado QBMP 1: 2 anos, prorrogável por igual período. CFO: conferir edital específico.',
    previsao: 'Não publicar novo concurso aberto sem fonte oficial. Destaque atual: CFO/2026 e Soldado QBMP 1 com publicações oficiais no portal CBMERJ.',
    site: 'https://www.cbmerj.rj.gov.br/cursos-e-concursos/'
  };

  ASSOCIACOES[inst] = [
    { nome: 'ABMRJ - Associação dos Bombeiros Militares do CBMERJ, seus Familiares e Amigos no Estado do Rio de Janeiro', foco: 'Bombeiros militares do CBMERJ, familiares e amigos', acao: 'Entidade associativa privada; serviços devem ser confirmados diretamente antes de publicar detalhe comercial.', site: 'Dados em breve', telefone: '(21) 7701-7746', mensalidade: 'Consultar diretamente na entidade', servicos: 'Representação associativa; detalhes de apoio jurídico, convênios e benefícios exigem confirmação direta.' },
    { nome: 'ASSINAP - Associação representativa de policiais e bombeiros militares', foco: 'Policiais e bombeiros militares, ativos, inativos e pensionistas', acao: 'Representação institucional e atendimento associativo no RJ.', site: 'https://assinap.com.br/', telefone: '(21) 96499-6470 / (21) 97469-2730 / (21) 97580-9680', mensalidade: 'Consultar diretamente na entidade', servicos: 'Atendimento associativo; serviços jurídicos e benefícios devem ser confirmados diretamente.' },
    { nome: 'Associação dos Oficiais Bombeiros RJ', foco: 'Oficiais da ativa e da reserva do CBMERJ', acao: 'Associação/clube com regras próprias de ingresso para oficiais e associados civis indicados.', site: 'https://clubeoficiaisbmrj.com.br/', telefone: '(21) 2252-1619', mensalidade: 'Consultar diretamente na entidade', servicos: 'Clube, apoio associativo, comunicação institucional e eventual assessoria conforme regras internas.' },
    { nome: 'FABOM - Fundação de Apoio ao Corpo de Bombeiros Militar do Estado do Rio de Janeiro', foco: 'Apoio institucional ao CBMERJ', acao: 'Fundação de apoio com atuação em iniciativas e benefícios vinculados ao CBMERJ.', site: 'https://fabom.org.br/', telefone: '(21) 96469-1060', mensalidade: 'Consultar diretamente na entidade', servicos: 'Apoio, benefícios, parceiros, atendimento e ações institucionais.' }
  ];

  ACOES_JUDICIAIS[inst] = [
    { titulo: 'CBMERJ — triênio/ATS preservado', status: 'Possível revisão individual', ano: 'Conforme data de ingresso', tipo: 'individual', desc: 'Conferir se o triênio, quando aplicável, foi calculado sobre soldo + GHP + GRET + GRAM. Para editais publicados a partir de 01/01/2022, observar a LC RJ 194/2021.', base: 'Lei RJ 1.608/1990; LC RJ 194/2021; Caderno de Remuneração RJ jan/2026.', fonte: 'GESPERJ/RJ', fonteUrl: 'https://www.rj.gov.br/gesperj/sites/default/files/Caderno%20de%20Remunera%C3%A7%C3%A3o%20-%20janeiro%20-%202026.pdf', atualizado: 'Maio/2026' },
    { titulo: 'CBMERJ — GRET, GHP e GRAM', status: 'Conferência remuneratória individual', ano: 'Tabela jan/2026', tipo: 'individual', desc: 'Verificar se percentuais e bases de cálculo de GRET, GHP e GRAM aplicados no contracheque correspondem ao posto/graduação, habilitação e enquadramento correto.', base: 'Lei RJ 279/1979; Lei RJ 9.537/2021; Decreto RJ 47.902/2021; Caderno de Remuneração RJ jan/2026.', fonte: 'GESPERJ/RJ', fonteUrl: 'https://www.rj.gov.br/gesperj/sites/default/files/Caderno%20de%20Remunera%C3%A7%C3%A3o%20-%20janeiro%20-%202026.pdf', atualizado: 'Maio/2026' },
    { titulo: 'CBMERJ — férias e licença especial não usufruídas em pecúnia', status: 'Possível cobrança administrativa/judicial', ano: 'Normas 2023/2026', tipo: 'individual', desc: 'Verificar direito a indenização de férias ou licença especial não usufruídas, especialmente na passagem para inatividade.', base: 'Art. 85-B da Lei RJ 279/1979; Decreto RJ 48.466/2023; Portaria CBMERJ 1.224/2023; Portaria CBMERJ 1332/2026.', fonte: 'CBMERJ/GESPERJ', fonteUrl: 'https://www.rj.gov.br/gesperj/sites/default/files/Caderno%20de%20Remunera%C3%A7%C3%A3o%20-%20janeiro%20-%202026.pdf', atualizado: 'Maio/2026' },
    { titulo: 'CBMERJ — SPSMERJ / contribuição / pensionistas', status: 'Possível revisão conforme caso concreto', ano: 'Lei 9.537/2021', tipo: 'individual', desc: 'Conferir contribuição, base de cálculo, pensão militar, inatividade e regra de transição do Sistema de Proteção Social dos Militares do RJ.', base: 'Lei RJ 9.537/2021; Lei Federal 13.954/2019.', fonte: 'SEDEC/CBMERJ', fonteUrl: 'https://www.cbmerj.rj.gov.br/', atualizado: 'Maio/2026' },
    { titulo: 'CBMERJ — PTTC', status: 'Possível conferência administrativa', ano: '2008/2026', tipo: 'individual', desc: 'Conferir valores, incidência de 13º, 1/3 de férias e ausência de contribuição previdenciária sobre adicional, conforme regras vigentes.', base: 'Lei RJ 5.271/2008; Lei RJ 11.042/2025; Decreto RJ 50.126/2026.', fonte: 'GESPERJ/RJ', fonteUrl: 'https://www.rj.gov.br/gesperj/sites/default/files/Caderno%20de%20Remunera%C3%A7%C3%A3o%20-%20janeiro%20-%202026.pdf', atualizado: 'Maio/2026' }
  ];
}

function aplicarDadosEspecificosBmba() {
  const inst = 'bmba';
  const estado = 'ba';
  const efetivoAtivo = 3800;
  const populacaoBa = 14870907;
  const reservaEstimada = 2700;
  const mulheresEstimadas = 600;
  const relacao = Math.round(populacaoBa / efetivoAtivo);

  HEADER_ESTADOS[estado] = HEADER_ESTADOS[estado] || {
    nome: 'Bahia',
    sigla: 'BA',
    pm: 'pmba',
    bm: inst,
    pc: 'pcba',
    pp: 'ppba',
    flag: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira_da_Bahia.svg'
  };
  HEADER_ESTADOS[estado].bm = inst;
  HEADER_ESTADOS[estado].bombeiro = inst;
  if (!INSTITUICOES_VALIDAS.includes(inst)) INSTITUICOES_VALIDAS.push(inst);

  HEADER_INSTITUICOES_INFO[inst] = {
    titulo: 'BMBA',
    desc: 'Corpo de Bombeiros Militar da Bahia'
  };

  HEADER_INSTITUICOES_RESUMO[inst] = {
    nome: 'Corpo de Bombeiros Militar da Bahia',
    sigla: 'BMBA',
    siglaInterna: 'CBMBA',
    estado: 'Bahia',
    estadoSigla: 'BA',
    tipo: 'Bombeiro Militar',
    criacao: '2014 · autonomia administrativa e financeira pela PEC estadual nº 138/2014 e organização básica pela Lei BA nº 13.202/2014; origem histórica do serviço de bombeiros anterior à autonomia institucional',
    ativa: efetivoAtivo,
    ativaLabel: '≈ 3,8 mil bombeiros militares ativos — estimativa operacional baseada no efetivo de 3.483 bombeiros empregados no Carnaval 2026 e na incorporação/formatura de 291 novos soldados em 2026; conferir DRH/CBMBA, SAEB/BA e folha antes de uso jurídico',
    reserva: reservaEstimada,
    reservaLabel: '≈ 2,7 mil vínculos de reserva, reforma e pensionistas — estimativa técnica para ordem de grandeza; conferir Suprev/Funprev-BA, SAEB/BA, DOE/BA e contracheque antes de cálculo individual',
    total: efetivoAtivo + reservaEstimada,
    totalLabel: '≈ 6,5 mil vínculos somando efetivo ativo estimado e reserva/reforma/pensionistas estimados',
    femininas: mulheresEstimadas,
    femininasLabel: '≈ 600 mulheres — estimativa técnica por composição provável da tropa e ingresso recente; não usar como número oficial fechado',
    populacao: populacaoBa,
    populacaoLabel: '14.870.907 habitantes',
    populacaoTitulo: 'População estimada da Bahia em 1º de julho de 2025, segundo IBGE',
    relacaoLabel: `≈ 1 bombeiro militar ativo para cada ${relacao.toLocaleString('pt-BR')} habitantes`,
    relacaoTitulo: `Relação estimada ativa/população: ${populacaoBa.toLocaleString('pt-BR')} habitantes ÷ ${efetivoAtivo.toLocaleString('pt-BR')} bombeiros militares ativos estimados`,
    governador: 'Jerônimo Rodrigues',
    comando: 'Coronel BM Aloísio Mascarenhas Fernandes — Comandante-Geral do CBMBA',
    estrutura: 'Comando-Geral, Subcomando-Geral, Comando de Operações de Bombeiros Militar, Comandos Regionais, batalhões, grupamentos e companhias operacionais; unidades de prevenção, segurança contra incêndio e pânico, atividades técnicas, busca e salvamento, combate a incêndio, atendimento pré-hospitalar, operações aquáticas, resposta a desastres e apoio à Defesa Civil.',
    sede: 'Comando-Geral do CBMBA — Ladeira Revolta dos Malês, nº 38, Centro Histórico, Salvador/BA, CEP 40.026-240',
    emergencia: '193',
    coberturaLabel: 'Atuação estadual, com reforços sazonais em Salvador, RMS, litoral, interior e grandes eventos; no Carnaval 2026 foram empregados 3.483 bombeiros militares.',
    ocorrenciasLabel: 'Ocorrências operacionais, vistorias, incêndios, salvamentos, resgates, apoio a eventos e ações preventivas devem ser atualizadas por relatórios do CBMBA, COBM, boletins oficiais e publicações do Governo da Bahia.',
    fonte: 'CBMBA; Governo da Bahia; SAEB/BA; DOE/BA; Lei BA nº 13.202/2014; Lei BA nº 14.890/2025; IBGE 2025; concursos CBMBA/FCC',
    atualizado: 'BMBA revisado em 06/05/2026 — comando, sede, concursos e efetivo operacional com fontes institucionais; população 2025 do IBGE; efetivo, reserva e mulheres exibidos como estimativas identificadas; remuneração pela Lei BA nº 14.890/2025'
  };

  REMUNERACAO_FONTES_OFICIAIS[inst] = {
    nome: 'DOE/BA e Casa Civil/BA — Lei BA nº 14.890/2025: soldo PM/BM, Gratificação de Atividade Policial Militar - GAP e auxílio-fardamento; soldo com efeitos em 01/05/2026 e GAP em 01/06/2026',
    url: 'https://cdn.atarde.com.br/img/attachmentinline/1310000/Jeronimo-sanciona-lei-de-reajuste-salarial-para-po0131683500202505060933.pdf?xid=6642146'
  };

  if (typeof CARGOS_BMBA !== 'undefined' && Array.isArray(CARGOS_BMBA) && CARGOS_BMBA.length) {
    CARGOS_ESTRUTURA_GENERICAS[inst] = CARGOS_BMBA;
  }

  CONFIGS_INSTITUICOES_GENERICAS[inst] = {
    titulo: 'BMBA',
    desc: 'Corpo de Bombeiros Militar da Bahia',
    cor: '#b91c1c',
    alertaPrev: 'BMBA/CBMBA: remuneração exibida como soldo oficial + GAP por referência, conforme Lei BA nº 14.890/2025, com auxílio-fardamento separado. Não somar automaticamente CET, adicional noturno, serviço extraordinário, diárias, alimentação, função, indenizações, parcelas pessoais, retroativos, abonos ou diferenças sem verificar escala, lotação, ato específico, ficha financeira e contracheque. A previdência dos militares baianos deve ser conferida pela regra vigente do Funprev/Suprev-BA e pela base de contribuição aplicada no holerite.'
  };

  CONCURSOS[inst] = {
    edital: 'BMBA/CBMBA — CFSD 2022 para Soldado Bombeiro Militar consta como em andamento no portal de concursos do CBMBA; CFOBM/2022 consta como finalizado. Manter monitoramento de DOE/BA, SAEB/BA, CBMBA e Fundação Carlos Chagas para homologações, prorrogações, convocações e eventual novo edital.',
    salario: 'Referência legal do site pela Lei BA nº 14.890/2025: Soldado BM com soldo R$ 1.633,88 + GAP Ref. I a V entre R$ 1.500,56 e R$ 3.085,14, resultando em bruto de R$ 3.134,44 a R$ 4.719,02, além de auxílio-fardamento de R$ 256,18 separado. Aluno Soldado foi mantido como referência estimada de formação e deve ser conferido no edital vigente.',
    vagas: 'Último CFSD BM 2022: 500 vagas para Soldado do CBMBA conforme edital divulgado pelo CBMBA/FCC. Há sinalizações públicas de novo concurso com 600 vagas para Soldado, mas o site deve publicar como previsão/monitoramento até edital oficial.',
    cotas: 'Conferir ampla concorrência, reserva para negros, sexo, região, cadastro de reserva e demais regras no edital vigente e retificações. Não aplicar regra de outro certame por analogia.',
    idade: 'Critérios de idade, altura, CNH, aptidão física, saúde, avaliação psicológica e investigação social devem ser extraídos do edital vigente. Manter cautela em convocações sub judice.',
    escolaridade: 'Soldado BM: nível médio no edital de 2022. Oficial/CFOBM: conferir edital próprio, requisitos, curso, bolsa e regime de formação.',
    banca: 'Fundação Carlos Chagas no CFSD 2022; confirmar organizadora em cada novo edital ou seleção.',
    inscritos: 'Total de inscritos, resultado final, homologação, prorrogação, convocações e matrículas devem ser conferidos no CBMBA, SAEB/BA, DOE/BA e banca.',
    materias: 'Conteúdo programático, pesos e critérios de aprovação variam por cargo e edital; publicar grade fechada somente após leitura da versão vigente e retificações.',
    etapas: 'Certames do CBMBA podem envolver prova objetiva, prova discursiva/redação, exame documental, TAF, exames médicos/odontológicos/toxicológicos, avaliação psicológica, investigação social e curso de formação, conforme edital.',
    cfsd: 'CBMBA informou em 2026 a conclusão/formatura de 291 novos soldados, reforçando capital e interior. Matrícula, bolsa/remuneração de formação, regime disciplinar e classificação final dependem dos atos do curso e do edital.',
    estagio: 'Exercício inicial, estágio operacional e lotação dependem de ato do CBMBA, necessidade operacional, batalhão/companhia de destino e boletins internos.',
    validade: 'CFSD 2022 aparece como em andamento no portal CBMBA; CFOBM/2022 como finalizado. Validar prazos, prorrogações e convocações no DOE/BA e no portal da banca antes de publicar status fechado.',
    previsao: 'Há previsão pública de novo concurso para Soldado BMBA, mas o portal deve tratar como previsão até edital oficial assinado e publicado. Evitar mensagem de concurso aberto sem fonte oficial atual.',
    site: 'https://www.cbm.ba.gov.br/portal/concursos'
  };

  ACOES_JUDICIAIS[inst] = [
    { titulo: 'BMBA — soldo, GAP por referência e auxílio-fardamento', status: 'Conferência individual', ano: 'Lei BA nº 14.890/2025', tipo: 'individual', desc: 'Verificar se posto/graduação, soldo vigente, referência da GAP, implantação dos efeitos de maio/junho de 2026 e auxílio-fardamento foram pagos corretamente. A tabela do site é referência de conferência, não liquidação individual.', base: 'Lei BA nº 14.890/2025, DOE/BA, ficha financeira, contracheque, atos de promoção e referência da GAP.', fonte: 'DOE/BA / SAEB-BA / CBMBA', fonteUrl: 'https://cdn.atarde.com.br/img/attachmentinline/1310000/Jeronimo-sanciona-lei-de-reajuste-salarial-para-po0131683500202505060933.pdf?xid=6642146', atualizado: 'Maio/2026' },
    { titulo: 'BMBA — CET, serviço extraordinário, diárias e parcelas indenizatórias', status: 'Depende de ato, escala e lotação', ano: 'Tema permanente', tipo: 'individual', desc: 'Conferir CET, adicional noturno, diárias, serviço extraordinário, gratificações de função, alimentação, fardamento, indenizações, retroativos e outras rubricas. Não tratar como parcela universal de toda a tropa.', base: 'Estatuto dos Policiais Militares da Bahia, normas do CBMBA/SSP/SAEB, escalas, boletins, ordem de serviço, ato de designação, contracheque e ficha financeira.', fonte: 'CBMBA / SAEB-BA / DOE-BA', fonteUrl: 'https://www.cbm.ba.gov.br/', atualizado: 'Maio/2026' },
    { titulo: 'BMBA — promoções, quadro de acesso, reserva/reforma e proteção social militar', status: 'Análise funcional', ano: 'Lei BA nº 13.202/2014 e normas correlatas', tipo: 'individual', desc: 'Promoções, interstícios, quadro de acesso, agregação, reserva remunerada, reforma, incapacidade e pensão militar dependem de data de ingresso, quadro, posto/graduação, cursos, conceito, tempo de serviço, ficha funcional e atos publicados.', base: 'Lei BA nº 13.202/2014, Estatuto dos Policiais Militares da Bahia, normas de promoção, proteção social militar, processo individual, boletins e DOE/BA.', fonte: 'CBMBA / Governo da Bahia / SAEB-BA', fonteUrl: 'https://www.ba.gov.br/comunicacao/2014/12/noticias/leis-de-organizacao-basica-da-policia-militar-e-dos-bombeiros-sao-sancionadas', atualizado: 'Maio/2026' }
  ];

  ASSOCIACOES[inst] = [
    { nome: 'APPMBA — Associação de Praças da Polícia e Bombeiro Militar da Bahia', foco: 'Praças da PMBA e do CBMBA, ativos, reserva, reformados e pensionistas', acao: 'Acompanhamento de pautas remuneratórias, carreira, proteção social, promoções, condições de trabalho e representação associativa.', site: 'https://appmba.com.br', telefone: 'Consultar canais oficiais da entidade', mensalidade: 'Consultar diretamente na entidade', servicos: 'Orientação associativa, comunicação de pautas, convênios e eventual apoio jurídico conforme contrato/estatuto.' },
    { nome: 'Força Invicta — associação de oficiais militares estaduais da Bahia', foco: 'Oficiais da Polícia Militar e do Corpo de Bombeiros Militar da Bahia', acao: 'Representação de oficiais em pautas de carreira, remuneração, proteção social, gestão institucional e condições de serviço.', site: 'Consultar canais oficiais da entidade', telefone: 'Consultar diretamente na entidade', mensalidade: 'Consultar diretamente na entidade', servicos: 'Representação, comunicação institucional, orientação ao associado e acompanhamento de pautas administrativas/judiciais.' },
    { nome: 'Canais institucionais do CBMBA', foco: 'Informação oficial para bombeiros militares, candidatos e sociedade baiana', acao: 'Publicações, concursos, legislação, prevenção, atividades técnicas, unidades, notícias e atendimento institucional.', site: 'https://www.cbm.ba.gov.br', telefone: '193 · contatos administrativos conforme unidade', mensalidade: 'Não se aplica', servicos: 'Concursos, notícias, prevenção, vistorias, legislação, serviços técnicos e comunicação institucional.' }
  ];
}

aplicarDadosEspecificosBmap();
aplicarDadosEspecificosPmap();
aplicarDadosEspecificosBmmg();
aplicarDadosEspecificosBmms();
aplicarDadosEspecificosBmpr();
aplicarDadosEspecificosBmrj();
aplicarDadosEspecificosBmba();
aplicarEstruturaFederaisDados();
aplicarRevisaoResumosInstitucionais();

/* ============================================================ */
/* === REVISÃO DA ABA CONCURSOS ================================ */
/* ============================================================ */
const CONCURSO_DADOS_EM_BREVE = 'Dados em breve';
const CONCURSO_CAMPOS_TEXTO = [
  'edital', 'salario', 'vagas', 'cotas', 'idade', 'escolaridade', 'banca',
  'inscritos', 'materias', 'etapas', 'cfsd', 'estagio', 'validade', 'previsao'
];

function concursoEhDadoPendente(valor) {
  if (valor === undefined || valor === null) return true;
  if (typeof valor === 'number') return !Number.isFinite(valor) || valor === 0;
  const texto = String(valor).trim();
  if (!texto || texto === '#' || texto === '-' || texto === '—') return true;
  if (texto === CONCURSO_DADOS_EM_BREVE) return true;
  return /^(a definir|a confirmar|a preencher|preencher|consultar|conferir|sem informação|sem informacao|sem inscrições|sem inscricoes|ainda não divulgado|ainda nao divulgado|não divulgado|nao divulgado|fonte oficial a preencher|dados pendentes|pendente|acompanhar|curso de formação.*preencher|curso de formacao.*preencher|prova objetiva\/discursiva quando prevista)\b/i.test(texto)
    || /\b(estrutura de concurso a preencher|estrutura .*para preenchimento|fonte oficial a preencher|preencher|a definir\/preencher|base .*pendente)\b/i.test(texto);
}

function concursoValorOuEmBreve(valor) {
  return concursoEhDadoPendente(valor) ? CONCURSO_DADOS_EM_BREVE : String(valor).trim();
}

function concursoUrlValida(valor) {
  const url = String(valor || '').trim();
  return /^https?:\/\//i.test(url) ? url : '#';
}

function concursoInfoInstituicao(inst) {
  const info = HEADER_INSTITUICOES_INFO[inst] || {};
  return {
    titulo: info.titulo || String(inst || '').toUpperCase(),
    desc: info.desc || CONCURSO_DADOS_EM_BREVE
  };
}

function concursoCriarBaseDadosEmBreve(inst) {
  const info = concursoInfoInstituicao(inst);
  const fonte = REMUNERACAO_FONTES_OFICIAIS[inst] || {};
  return {
    edital: `${info.titulo} — ${info.desc}`,
    salario: CONCURSO_DADOS_EM_BREVE,
    vagas: CONCURSO_DADOS_EM_BREVE,
    cotas: CONCURSO_DADOS_EM_BREVE,
    idade: CONCURSO_DADOS_EM_BREVE,
    escolaridade: CONCURSO_DADOS_EM_BREVE,
    banca: CONCURSO_DADOS_EM_BREVE,
    inscritos: CONCURSO_DADOS_EM_BREVE,
    materias: CONCURSO_DADOS_EM_BREVE,
    etapas: CONCURSO_DADOS_EM_BREVE,
    cfsd: CONCURSO_DADOS_EM_BREVE,
    estagio: CONCURSO_DADOS_EM_BREVE,
    validade: CONCURSO_DADOS_EM_BREVE,
    previsao: CONCURSO_DADOS_EM_BREVE,
    site: concursoUrlValida(fonte.url)
  };
}

function concursoNormalizarObjeto(inst, dados) {
  const normalizado = concursoCriarBaseDadosEmBreve(inst);
  const origem = dados && typeof dados === 'object' ? dados : {};

  CONCURSO_CAMPOS_TEXTO.forEach(campo => {
    normalizado[campo] = concursoValorOuEmBreve(origem[campo] ?? normalizado[campo]);
  });

  normalizado.site = concursoUrlValida(origem.site || normalizado.site);
  return normalizado;
}

function aplicarRevisaoConcursosInstituicoes() {
  const instituicoes = new Set(INSTITUICOES_VALIDAS || []);

  Object.values(HEADER_ESTADOS || {}).forEach(estado => {
    ['pm', 'bm', 'pc', 'pp', 'pf', 'prf'].forEach(ramo => {
      if (estado && estado[ramo]) instituicoes.add(estado[ramo]);
    });
  });

  ['pf', 'prf'].forEach(inst => instituicoes.add(inst));

  instituicoes.forEach(inst => {
    if (!inst) return;
    if (!INSTITUICOES_VALIDAS.includes(inst)) INSTITUICOES_VALIDAS.push(inst);
    if (!HEADER_INSTITUICOES_INFO[inst]) {
      HEADER_INSTITUICOES_INFO[inst] = { titulo: String(inst).toUpperCase(), desc: CONCURSO_DADOS_EM_BREVE };
    }

    let dados = CONCURSOS[inst];
    if (!dados && typeof isPoliciaPenal === 'function' && typeof getConcursoPoliciaPenal === 'function') {
      try {
        if (isPoliciaPenal(inst)) dados = getConcursoPoliciaPenal(inst);
      } catch (erro) {
        dados = null;
      }
    }

    CONCURSOS[inst] = concursoNormalizarObjeto(inst, dados);
  });
}

aplicarRevisaoConcursosInstituicoes();


/* ============================================================ */
/* === PADRONIZAÇÃO GLOBAL DE DADOS SEM FONTE SEGURA =========== */
/* ============================================================ */
const DADOS_EM_BREVE_PADRAO_GLOBAL = 'Dados em breve';

function dadoSemFonteSegura(valor) {
  if (valor === undefined || valor === null) return true;
  if (typeof valor === 'number') return false;
  if (typeof valor !== 'string') return false;
  const texto = valor.trim();
  if (!texto || texto === '#' || texto === '-' || texto === '—') return true;
  if (texto === DADOS_EM_BREVE_PADRAO_GLOBAL) return false;
  if (/^https?:\/\//i.test(texto)) return false;
  return /(?:a preencher|preencher|a confirmar|nome a confirmar|a definir|sem informação|sem informacao|não informado|nao informado|não divulgado|nao divulgado|ainda não divulgado|ainda nao divulgado|pendente|dados pendentes|estrutura criada|estrutura aberta|para preenchimento|fonte oficial a preencher|fontes oficiais .* preencher|consultar diretamente|consultar site|consultar canais|consultar edital|consultar banca|consultar fonte|conferir edital|conferir autorização|acompanhar diário oficial|acompanhar diario oficial|não afirmar concurso aberto|nao afirmar concurso aberto|espaço reservado|espaco reservado|reservado para|cadastrar aqui|serviços a preencher|servicos a preencher|verificar caso a caso|análise individual|analise individual|base local pendente|base federal pendente|regra local a preencher|regra federal a preencher|tema permanente|tema recorrente|documentos funcionais e normas locais|documentos funcionais e normas federais|conferência previdenciária individual|conferencia previdenciaria individual)/i.test(texto);
}

function normalizarTextoSemFonteSegura(valor) {
  return dadoSemFonteSegura(valor) ? DADOS_EM_BREVE_PADRAO_GLOBAL : valor;
}

function normalizarObjetoSemFonteSegura(obj, visitados = new WeakSet()) {
  if (!obj || typeof obj !== 'object') return obj;
  if (visitados.has(obj)) return obj;
  visitados.add(obj);

  if (Array.isArray(obj)) {
    obj.forEach((item, indice) => {
      if (item && typeof item === 'object') normalizarObjetoSemFonteSegura(item, visitados);
      else obj[indice] = normalizarTextoSemFonteSegura(item);
    });
    return obj;
  }

  Object.keys(obj).forEach(chave => {
    const valor = obj[chave];
    if (valor && typeof valor === 'object') {
      normalizarObjetoSemFonteSegura(valor, visitados);
      return;
    }
    if (/^(url|fonteUrl|href|flag|brasao|imagem|img|logo)$/i.test(chave)) return;
    obj[chave] = normalizarTextoSemFonteSegura(valor);
  });
  return obj;
}

function aplicarPadraoDadosEmBreveGlobal() {
  [
    HEADER_INSTITUICOES_RESUMO,
    CONCURSOS,
    ACOES_JUDICIAIS,
    ASSOCIACOES,
    POLICIAS_PENAIS_INFO,
    CONFIGS_INSTITUICOES_GENERICAS,
    CARGOS_ESTRUTURA_GENERICAS,
    REMUNERACAO_FONTES_OFICIAIS,
    typeof CARGOS_PM !== 'undefined' ? CARGOS_PM : null,
    typeof CARGOS_PC !== 'undefined' ? CARGOS_PC : null,
    typeof CARGOS_PMERJ !== 'undefined' ? CARGOS_PMERJ : null,
    typeof CARGOS_PCERJ !== 'undefined' ? CARGOS_PCERJ : null,
    typeof CARGOS_PMMG !== 'undefined' ? CARGOS_PMMG : null,
    typeof CARGOS_PCMG !== 'undefined' ? CARGOS_PCMG : null,
    typeof CARGOS_PMBA !== 'undefined' ? CARGOS_PMBA : null,
    typeof CARGOS_BMBA !== 'undefined' ? CARGOS_BMBA : null,
    typeof CARGOS_PCBA !== 'undefined' ? CARGOS_PCBA : null,
    typeof CARGOS_PMPR !== 'undefined' ? CARGOS_PMPR : null,
    typeof CARGOS_PCPR !== 'undefined' ? CARGOS_PCPR : null,
    typeof CARGOS_PMRS !== 'undefined' ? CARGOS_PMRS : null,
    typeof CARGOS_PCRS !== 'undefined' ? CARGOS_PCRS : null,
    typeof CARGOS_PMSC !== 'undefined' ? CARGOS_PMSC : null,
    typeof CARGOS_PCSC !== 'undefined' ? CARGOS_PCSC : null,
    typeof CARGOS_PMES !== 'undefined' ? CARGOS_PMES : null,
    typeof CARGOS_PCES !== 'undefined' ? CARGOS_PCES : null,
    typeof CARGOS_PMMS !== 'undefined' ? CARGOS_PMMS : null,
    typeof CARGOS_PCMS !== 'undefined' ? CARGOS_PCMS : null,
    typeof CARGOS_PMMT !== 'undefined' ? CARGOS_PMMT : null,
    typeof CARGOS_PCMT !== 'undefined' ? CARGOS_PCMT : null,
    typeof CARGOS_PMAC !== 'undefined' ? CARGOS_PMAC : null,
    typeof CARGOS_PCAC !== 'undefined' ? CARGOS_PCAC : null,
    typeof CARGOS_PPSP !== 'undefined' ? CARGOS_PPSP : null,
    typeof CARGOS_PPRJ !== 'undefined' ? CARGOS_PPRJ : null,
    typeof CARGOS_PPMG !== 'undefined' ? CARGOS_PPMG : null,
    typeof CARGOS_PPBA !== 'undefined' ? CARGOS_PPBA : null,
    typeof CARGOS_PPPR !== 'undefined' ? CARGOS_PPPR : null,
    typeof CARGOS_PPRS !== 'undefined' ? CARGOS_PPRS : null,
    typeof CARGOS_PPSC !== 'undefined' ? CARGOS_PPSC : null,
    typeof CARGOS_PPES !== 'undefined' ? CARGOS_PPES : null,
    typeof CARGOS_PPMS !== 'undefined' ? CARGOS_PPMS : null,
    typeof CARGOS_PPMT !== 'undefined' ? CARGOS_PPMT : null,
    typeof CARGOS_PPAC !== 'undefined' ? CARGOS_PPAC : null
  ].forEach(base => normalizarObjetoSemFonteSegura(base));
}

aplicarPadraoDadosEmBreveGlobal();

/* ============================================================ */
/* === INDICADOR DE ATUALIZAÇÃO DO PORTAL ====================== */
/* ============================================================ */
const CAMPOS_IGNORADOS_PERCENTUAL_PORTAL = new Set([
  'id', 'inst', 'selected', 'cor', 'color', 'flag', 'brasao', 'imagem', 'img',
  'logo', 'path', 'classe', 'className', 'data', 'tipoCalculo', 'grupo'
]);

function campoContaParaPercentualPortal(chave, valor) {
  if (valor === undefined || valor === null) return true;
  if (typeof valor === 'boolean' || typeof valor === 'function') return false;
  if (!chave) return true;
  return !CAMPOS_IGNORADOS_PERCENTUAL_PORTAL.has(String(chave));
}

function valorPreenchidoParaPercentualPortal(valor, chave = '') {
  if (valor === undefined || valor === null) return false;
  if (typeof valor === 'number') return Number.isFinite(valor) && valor > 0;
  if (typeof valor === 'boolean' || typeof valor === 'function') return true;

  const texto = String(valor).trim();
  if (!texto || texto === '#' || texto === '-' || texto === '—') return false;
  if (/dados em breve/i.test(texto)) return false;

  if (/url|href|site|fonteurl/i.test(String(chave))) {
    return /^https?:\/\//i.test(texto);
  }

  if (typeof dadoSemFonteSegura === 'function' && dadoSemFonteSegura(texto)) return false;
  if (typeof resumoEhDadoPendente === 'function' && resumoEhDadoPendente(texto)) return false;
  if (typeof concursoEhDadoPendente === 'function' && concursoEhDadoPendente(texto)) return false;
  return true;
}

function adicionarBasePercentualPortal(bases, nome, valor) {
  if (valor && typeof valor === 'object') bases.push({ nome, valor });
}

function getBasesPercentualAtualizacaoPortal() {
  const bases = [];
  adicionarBasePercentualPortal(bases, 'resumos institucionais', HEADER_INSTITUICOES_RESUMO);
  adicionarBasePercentualPortal(bases, 'concursos', CONCURSOS);
  adicionarBasePercentualPortal(bases, 'ações judiciais', ACOES_JUDICIAIS);
  adicionarBasePercentualPortal(bases, 'associações e sindicatos', ASSOCIACOES);
  adicionarBasePercentualPortal(bases, 'polícias penais', POLICIAS_PENAIS_INFO);
  adicionarBasePercentualPortal(bases, 'fontes oficiais de remuneração', REMUNERACAO_FONTES_OFICIAIS);

  [
    ['cargos PM', typeof CARGOS_PM !== 'undefined' ? CARGOS_PM : null],
    ['cargos PC', typeof CARGOS_PC !== 'undefined' ? CARGOS_PC : null],
    ['cargos PMERJ', typeof CARGOS_PMERJ !== 'undefined' ? CARGOS_PMERJ : null],
    ['cargos PCERJ', typeof CARGOS_PCERJ !== 'undefined' ? CARGOS_PCERJ : null],
    ['cargos PMMG', typeof CARGOS_PMMG !== 'undefined' ? CARGOS_PMMG : null],
    ['cargos PCMG', typeof CARGOS_PCMG !== 'undefined' ? CARGOS_PCMG : null],
    ['cargos PMBA', typeof CARGOS_PMBA !== 'undefined' ? CARGOS_PMBA : null],
    ['cargos PCBA', typeof CARGOS_PCBA !== 'undefined' ? CARGOS_PCBA : null],
    ['cargos PMPR', typeof CARGOS_PMPR !== 'undefined' ? CARGOS_PMPR : null],
    ['cargos PCPR', typeof CARGOS_PCPR !== 'undefined' ? CARGOS_PCPR : null],
    ['cargos PMRS', typeof CARGOS_PMRS !== 'undefined' ? CARGOS_PMRS : null],
    ['cargos PCRS', typeof CARGOS_PCRS !== 'undefined' ? CARGOS_PCRS : null],
    ['cargos PMSC', typeof CARGOS_PMSC !== 'undefined' ? CARGOS_PMSC : null],
    ['cargos PCSC', typeof CARGOS_PCSC !== 'undefined' ? CARGOS_PCSC : null],
    ['cargos PMES', typeof CARGOS_PMES !== 'undefined' ? CARGOS_PMES : null],
    ['cargos PCES', typeof CARGOS_PCES !== 'undefined' ? CARGOS_PCES : null],
    ['cargos PMMS', typeof CARGOS_PMMS !== 'undefined' ? CARGOS_PMMS : null],
    ['cargos PCMS', typeof CARGOS_PCMS !== 'undefined' ? CARGOS_PCMS : null],
    ['cargos PMMT', typeof CARGOS_PMMT !== 'undefined' ? CARGOS_PMMT : null],
    ['cargos PCMT', typeof CARGOS_PCMT !== 'undefined' ? CARGOS_PCMT : null],
    ['cargos PMAC', typeof CARGOS_PMAC !== 'undefined' ? CARGOS_PMAC : null],
    ['cargos PCAC', typeof CARGOS_PCAC !== 'undefined' ? CARGOS_PCAC : null],
    ['cargos PPSP', typeof CARGOS_PPSP !== 'undefined' ? CARGOS_PPSP : null],
    ['cargos PPRJ', typeof CARGOS_PPRJ !== 'undefined' ? CARGOS_PPRJ : null],
    ['cargos PPMG', typeof CARGOS_PPMG !== 'undefined' ? CARGOS_PPMG : null],
    ['cargos PPBA', typeof CARGOS_PPBA !== 'undefined' ? CARGOS_PPBA : null],
    ['cargos PPPR', typeof CARGOS_PPPR !== 'undefined' ? CARGOS_PPPR : null],
    ['cargos PPRS', typeof CARGOS_PPRS !== 'undefined' ? CARGOS_PPRS : null],
    ['cargos PPSC', typeof CARGOS_PPSC !== 'undefined' ? CARGOS_PPSC : null],
    ['cargos PPES', typeof CARGOS_PPES !== 'undefined' ? CARGOS_PPES : null],
    ['cargos PPMS', typeof CARGOS_PPMS !== 'undefined' ? CARGOS_PPMS : null],
    ['cargos PPMT', typeof CARGOS_PPMT !== 'undefined' ? CARGOS_PPMT : null],
    ['cargos PPAC', typeof CARGOS_PPAC !== 'undefined' ? CARGOS_PPAC : null],
    ['cargos estruturais genéricos', CARGOS_ESTRUTURA_GENERICAS]
  ].forEach(([nome, valor]) => adicionarBasePercentualPortal(bases, nome, valor));

  return bases;
}

function contabilizarPercentualAtualizacaoPortal(valor, stats, chave = '', visitados = new WeakSet()) {
  if (valor && typeof valor === 'object') {
    if (visitados.has(valor)) return stats;
    visitados.add(valor);

    if (Array.isArray(valor)) {
      valor.forEach(item => contabilizarPercentualAtualizacaoPortal(item, stats, chave, visitados));
      return stats;
    }

    Object.entries(valor).forEach(([subChave, subValor]) => {
      contabilizarPercentualAtualizacaoPortal(subValor, stats, subChave, visitados);
    });
    return stats;
  }

  if (!campoContaParaPercentualPortal(chave, valor)) return stats;
  stats.total += 1;
  if (valorPreenchidoParaPercentualPortal(valor, chave)) stats.preenchidos += 1;
  else stats.emBreve += 1;
  return stats;
}

function calcularPercentualAtualizacaoPortal() {
  const stats = { total: 0, preenchidos: 0, emBreve: 0 };
  getBasesPercentualAtualizacaoPortal().forEach(base => {
    contabilizarPercentualAtualizacaoPortal(base.valor, stats);
  });

  const percentual = stats.total ? (stats.preenchidos / stats.total) * 100 : 0;
  return {
    ...stats,
    percentual,
    percentualTexto: `${percentual.toFixed(percentual >= 99.5 || percentual < 10 ? 0 : 1).replace('.', ',')}%`
  };
}

function atualizarIndicadorPercentualPortal() {
  const indicador = calcularPercentualAtualizacaoPortal();
  const valor = document.getElementById('header-resumo-dados-atualizados');
  const label = document.getElementById('header-label-dados-atualizados');

  if (label) label.textContent = 'Dados de atualização do site';
  if (valor) {
    valor.textContent = indicador.percentualTexto;
    valor.title = `${indicador.preenchidos.toLocaleString('pt-BR')} de ${indicador.total.toLocaleString('pt-BR')} campos com dados preenchidos; ${indicador.emBreve.toLocaleString('pt-BR')} em “Dados em breve”.`;
    valor.setAttribute('aria-label', `${indicador.percentualTexto} dos dados cadastrados estão preenchidos`);
    valor.dataset.totalCampos = String(indicador.total);
    valor.dataset.camposPreenchidos = String(indicador.preenchidos);
    valor.dataset.camposEmBreve = String(indicador.emBreve);
  }

  return indicador;
}

function formatarNumeroHeader(valor) {
  return Number(valor || 0).toLocaleString('pt-BR');
}

function formatarEfetivoHeader(valor) {
  const numero = Number(valor || 0);
  if (!numero) return RESUMO_DADOS_EM_BREVE;
  if (numero >= 1000000) {
    const milhao = numero / 1000000;
    let texto = Number.isInteger(milhao) ? String(milhao) : milhao.toFixed(1).replace('.', ',');
    texto = texto.replace(',0', '');
    return `≈ ${texto} ${milhao >= 2 ? 'milhões' : 'milhão'}`;
  }
  if (numero >= 1000) {
    const mil = numero / 1000;
    let texto = Number.isInteger(mil) ? String(mil) : mil.toFixed(1).replace('.', ',');
    texto = texto.replace(',0', '');
    return `≈ ${texto} mil`;
  }
  return `≈ ${formatarNumeroHeader(numero)}`;
}

function calcularRelacaoHeader(populacao, ativa) {
  const pop = Number(populacao || 0);
  const ativo = Number(ativa || 0);
  if (!pop || !ativo) return RESUMO_DADOS_EM_BREVE;
  const habitantesPorAtivo = Math.round(pop / ativo);
  const percentual = ((ativo / pop) * 100).toFixed(3).replace('.', ',');
  return `1 ativo / ${habitantesPorAtivo.toLocaleString('pt-BR')} hab. · ${percentual}%`;
}

function calcularEfetivoTotalResumoHeader(dados = {}) {
  if (dados.efetivoTotalLabel) return dados.efetivoTotalLabel;
  const ativa = Number(dados.ativa || 0);
  const reserva = Number(dados.reserva || 0);
  if (ativa || reserva) return formatarEfetivoHeader(ativa + reserva);
  if (dados.ativaLabel) return dados.ativaLabel;
  return formatarEfetivoHeader(dados.ativa);
}

function calcularEfetivoAtivoResumoHeader(dados = {}) {
  if (dados.ativaLabel) return dados.ativaLabel;
  return formatarEfetivoHeader(dados.ativa);
}

function atualizarLabelsHeaderResumo(labels = {}) {
  const padrao = {
    'header-label-natureza': 'Natureza',
    'header-label-uf': 'UF/Jurisdição',
    'header-label-criacao': 'Criação',
    'header-label-ativa': 'Efetivo na ativa',
    'header-label-reserva': 'Reserva/inativos',
    'header-label-total': 'Mulheres no efetivo',
    'header-label-populacao': 'População do Estado',
    'header-label-relacao': 'Relação ativa/população',
    'header-label-dados-atualizados': 'Dados de atualização do site',
    'header-label-governador': 'Chefe do Executivo',
    'header-label-comando': 'Comando/Direção'
  };

  Object.entries({ ...padrao, ...labels }).forEach(([id, valor]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = valor;
  });
}


function alternarHeaderComandoResumo(visivel) {
  document.querySelectorAll('.header-command-item').forEach(item => {
    item.hidden = !visivel;
    item.classList.toggle('is-hidden', !visivel);
  });
}

function calcularResumoPortalHeader() {
  const instituicoes = INSTITUICOES_VALIDAS.length;
  const estados = Object.keys(HEADER_ESTADOS).filter(chave => !['br', 'municipal'].includes(chave)).length;
  let ativa = 0;
  let reserva = 0;
  let femininas = 0;

  INSTITUICOES_VALIDAS.forEach(inst => {
    const dados = HEADER_INSTITUICOES_RESUMO[inst] || {};
    const infoPenal = POLICIAS_PENAIS_INFO?.[inst] || {};
    ativa += Number(dados.ativa || infoPenal.efetivoAtivo || 0);
    reserva += Number(dados.reserva || 0);
    femininas += Number(dados.femininas || 0);
  });

  // A população abrangida do portal é a população brasileira uma única vez.
  // Não somar populações por instituição/ramo, pois isso duplica ou multiplica a abrangência real.
  const populacao = Number(HEADER_INSTITUICOES_RESUMO.pf?.populacao || 213400000);

  return { instituicoes, estados, ativa, reserva, femininas, total: ativa + reserva, populacao };
}

function aplicarHeaderInicialPortal() {
  headerModoInicialPortal = true;
  document.body.setAttribute('data-inst', 'portal');
  document.body.style.removeProperty('--vermelho');
  document.body.style.removeProperty('--vermelho-escuro');
  setHeaderHeroImage('img/LOGO/logoleao.webp');
  setSiteHeaderBackgroundImage('img/LOGO/logoleao.webp');
  setPageInstitutionBackgroundImage('img/LOGO/logoleao.webp');
  const card = document.querySelector('.header-institution-card');
  if (card) card.classList.add('header-portal-home');

  const resumoPortal = calcularResumoPortalHeader();
  const setTexto = (id, valor) => {
    const el = document.getElementById(id);
    if (el) el.textContent = valor;
  };

  const flagAtual = document.getElementById('header-active-flag');
  if (flagAtual) {
    configurarLogoInicialHeader(flagAtual);
    const moldura = flagAtual.closest('.current-flag-frame');
    if (moldura) {
      moldura.classList.remove('institution-logo-frame');
      moldura.classList.add('brand-logo-frame');
    }
  }

  setTexto('header-active-sigla', 'Universo');
  setTexto('header-active-name', 'Segurança Pública');
  setTexto('header-desc', 'Escolha uma instituição');
  setTexto('header-resumo-titulo', 'Resumo do portal');
  setTexto('header-resumo-atualizado', 'Visão geral do portal');

  alternarHeaderComandoResumo(false);

  atualizarLabelsHeaderResumo({
    'header-label-natureza': 'Escopo',
    'header-label-uf': 'Abrangência',
    'header-label-criacao': 'Instituições',
    'header-label-ativa': 'Efetivo total estimado',
    'header-label-reserva': 'Reserva/inativos',
    'header-label-total': 'Mulheres no efetivo',
    'header-label-populacao': 'População abrangida',
    'header-label-relacao': 'UFs',
    'header-label-dados-atualizados': 'Dados de atualização do site',
    'header-label-governador': 'Cobertura',
    'header-label-comando': 'Comando/Direção'
  });

  setTexto('header-resumo-natureza', 'Portal informativo');
  setTexto('header-resumo-uf', 'Brasil');
  setTexto('header-resumo-criacao', String(resumoPortal.instituicoes));
  setTexto('header-resumo-ativa', `${formatarEfetivoHeader(resumoPortal.total)}+`);
  setTexto('header-resumo-reserva', `${formatarEfetivoHeader(resumoPortal.reserva)}+`);
  setTexto('header-resumo-total', `${formatarEfetivoHeader(resumoPortal.femininas)}+`);
  setTexto('header-resumo-populacao', `${formatarNumeroHeader(resumoPortal.populacao)} (estimado)`);
  setTexto('header-resumo-relacao', `${resumoPortal.estados} UFs`);
  atualizarIndicadorPercentualPortal();
  setTexto('header-resumo-governador', 'Polícia Rodoviária Federal, Polícia Federal, Polícia Militar, Polícia Civil, Polícia Penal e Bombeiro Militar');
  setTexto('header-resumo-comando', '—');

  ['instituicao', 'instituicao_header', 'instituicao_home'].forEach(id => {
    const seletor = document.getElementById(id);
    if (seletor) seletor.value = '';
  });

  [['header-pm-sigla', 'PM'], ['header-bm-sigla', 'CBM'], ['header-pc-sigla', 'PC'], ['header-pp-sigla', 'PP']].forEach(([id, valor]) => setTexto(id, valor));
  ['header-branch-pm', 'header-branch-bm', 'header-branch-pc', 'header-branch-pp'].forEach(id => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.disabled = true;
    btn.classList.remove('active');
    btn.setAttribute('aria-pressed', 'false');
  });

  document.querySelectorAll('.state-flag').forEach(flag => {
    flag.classList.remove('active');
    flag.setAttribute('aria-pressed', 'false');
  });

  atualizarVisibilidadeResumoInstitucional('principal');
}

function getResumoHeaderLabelsPorInstituicao(inst, dados = {}) {
  const instTexto = String(inst || '').toLowerCase();
  const tipoTexto = String(dados.tipo || '').toLowerCase();
  const ehPenal = instTexto.startsWith('pp') || tipoTexto.includes('penal');
  const ehBombeiro = instTexto.startsWith('bm') || tipoTexto.includes('bombeiro');
  const ehMilitar = instTexto.startsWith('pm') || instTexto === 'pmerj' || tipoTexto.includes('militar');
  const ehCivil = instTexto.startsWith('pc') || instTexto === 'pcerj' || tipoTexto.includes('civil');
  const ehFederal = ['pf', 'prf'].includes(instTexto) || dados.estadoSigla === 'BR';

  if (instTexto === 'pmesp') {
    return {
      'header-label-natureza': 'Natureza',
      'header-label-uf': 'UF/Jurisdição',
      'header-label-criacao': 'Origem histórica',
      'header-label-ativa': 'Efetivo ativo oficial',
      'header-label-reserva': 'Inativos (SSP)',
      'header-label-total': 'Efetivo legal',
      'header-label-populacao': dados.populacaoTitulo || 'População do Estado',
      'header-label-relacao': dados.relacaoTitulo || 'Efetivo/população',
      'header-label-governador': 'Chefe do Executivo',
      'header-label-comando': 'Comando-Geral'
    };
  }

  if (ehPenal) {
    return {
      'header-label-natureza': 'Natureza',
      'header-label-uf': 'UF/Jurisdição',
      'header-label-criacao': 'Base constitucional',
      'header-label-ativa': 'Efetivo na ativa',
      'header-label-reserva': 'Inativos/RPPS',
      'header-label-total': 'Mulheres no efetivo',
      'header-label-populacao': dados.populacaoTitulo || 'Presos atendidos',
      'header-label-relacao': dados.relacaoTitulo || 'Servidor/preso',
      'header-label-governador': ehFederal ? 'Governo responsável' : 'Chefe do Executivo',
      'header-label-comando': 'Direção/Secretaria'
    };
  }

  if (ehBombeiro) {
    return {
      'header-label-natureza': 'Natureza',
      'header-label-uf': 'UF/Jurisdição',
      'header-label-criacao': 'Criação',
      'header-label-ativa': 'Efetivo na ativa',
      'header-label-reserva': 'Reserva/reforma',
      'header-label-total': 'Mulheres no efetivo',
      'header-label-populacao': dados.populacaoTitulo || 'População do Estado',
      'header-label-relacao': dados.relacaoTitulo || 'Efetivo/população',
      'header-label-governador': 'Chefe do Executivo',
      'header-label-comando': 'Comando-Geral'
    };
  }

  if (ehMilitar) {
    return {
      'header-label-natureza': 'Natureza',
      'header-label-uf': 'UF/Jurisdição',
      'header-label-criacao': 'Criação',
      'header-label-ativa': 'Efetivo na ativa',
      'header-label-reserva': 'Reserva/reforma',
      'header-label-total': 'Mulheres no efetivo',
      'header-label-populacao': dados.populacaoTitulo || 'População do Estado',
      'header-label-relacao': dados.relacaoTitulo || 'Efetivo/população',
      'header-label-governador': 'Chefe do Executivo',
      'header-label-comando': 'Comando-Geral'
    };
  }

  if (ehCivil) {
    return {
      'header-label-natureza': 'Natureza',
      'header-label-uf': 'UF/Jurisdição',
      'header-label-criacao': 'Origem histórica',
      'header-label-ativa': 'Efetivo na ativa',
      'header-label-reserva': 'Inativos estimados',
      'header-label-total': 'Mulheres no efetivo',
      'header-label-populacao': dados.populacaoTitulo || 'População do Estado',
      'header-label-relacao': dados.relacaoTitulo || 'Efetivo/população',
      'header-label-governador': 'Chefe do Executivo',
      'header-label-comando': 'Delegado-Geral/Chefia'
    };
  }

  if (ehFederal) {
    return {
      'header-label-natureza': 'Natureza',
      'header-label-uf': 'Jurisdição',
      'header-label-criacao': 'Fundamento histórico',
      'header-label-ativa': 'Efetivo na ativa',
      'header-label-reserva': 'Aposentados/inativos',
      'header-label-total': 'Mulheres no efetivo',
      'header-label-populacao': dados.populacaoTitulo || 'Abrangência',
      'header-label-relacao': dados.relacaoTitulo || 'Indicador',
      'header-label-governador': 'Governo responsável',
      'header-label-comando': 'Direção-Geral'
    };
  }

  return {
    'header-label-populacao': dados.populacaoTitulo || 'População do Estado',
    'header-label-relacao': dados.relacaoTitulo || 'Relação ativa/população'
  };
}

function resumoHeaderUfLabel(dados = {}) {
  const sigla = dados.estadoSigla && !resumoEhDadoPendente(dados.estadoSigla) ? String(dados.estadoSigla).trim() : '';
  const estado = dados.estado && !resumoEhDadoPendente(dados.estado) ? String(dados.estado).trim() : '';
  if (sigla && estado && sigla !== estado) return `${sigla} · ${estado}`;
  return sigla || estado || RESUMO_DADOS_EM_BREVE;
}

function atualizarHeaderResumo(inst) {
  const tituloResumo = document.getElementById('header-resumo-titulo');
  if (tituloResumo) tituloResumo.textContent = 'Resumo institucional';

  const dados = HEADER_INSTITUICOES_RESUMO[inst] || HEADER_INSTITUICOES_RESUMO.pmesp;
  alternarHeaderComandoResumo(true);
  atualizarLabelsHeaderResumo(getResumoHeaderLabelsPorInstituicao(inst, dados));

  const setTexto = (id, valor) => {
    const el = document.getElementById(id);
    if (el) el.textContent = resumoValorOuEmBreve(valor);
  };

  const ativaTexto = calcularEfetivoAtivoResumoHeader(dados);
  const reservaTexto = dados.reservaLabel || formatarEfetivoHeader(dados.reserva);
  const femininasTexto = dados.femininasLabel || (dados.femininas ? formatarNumeroHeader(dados.femininas) : RESUMO_DADOS_EM_BREVE);
  const relacaoTexto = dados.relacaoLabel || calcularRelacaoHeader(dados.populacao, dados.ativa);
  const naturezaTexto = dados.tipo || resumoInferirTipo(inst, dados);

  setTexto('header-resumo-atualizado', dados.atualizado || 'Atualizado');
  setTexto('header-resumo-natureza', naturezaTexto);
  setTexto('header-resumo-uf', resumoHeaderUfLabel(dados));
  setTexto('header-resumo-criacao', dados.criacao || RESUMO_DADOS_EM_BREVE);
  setTexto('header-resumo-ativa', ativaTexto);
  setTexto('header-resumo-reserva', reservaTexto);
  setTexto('header-resumo-total', femininasTexto);
  setTexto('header-resumo-populacao', dados.populacaoLabel || (dados.populacao ? formatarNumeroHeader(dados.populacao) : RESUMO_DADOS_EM_BREVE));
  setTexto('header-resumo-relacao', relacaoTexto);
  atualizarIndicadorPercentualPortal();
  setTexto('header-resumo-governador', dados.governador || RESUMO_DADOS_EM_BREVE);
  setTexto('header-resumo-comando', dados.comando || RESUMO_DADOS_EM_BREVE);
}

function getEstadoDaInstituicao(inst) {
  return Object.keys(HEADER_ESTADOS).find(estado => {
    const item = HEADER_ESTADOS[estado];
    return item.pm === inst || item.bm === inst || item.pc === inst || item.pp === inst;
  }) || 'sp';
}

function selecionarEstado(estado) {
  const estadoNormalizado = String(estado || '').toLowerCase();
  const dadosEstado = HEADER_ESTADOS[estadoNormalizado];
  if (!dadosEstado) return;

  mudarInstituicao(dadosEstado.pm || dadosEstado.pc || dadosEstado.pp);
  switchPage('principal');
  mostrarToast(`${dadosEstado.nome} selecionado.`);
}

function selecionarRamo(ramo) {
  const estadoAtivo = getEstadoDaInstituicao(currInst);
  const dadosEstado = HEADER_ESTADOS[estadoAtivo] || HEADER_ESTADOS.sp;
  const instituicao = dadosEstado[ramo] || dadosEstado.pm || dadosEstado.pc || dadosEstado.pp;
  if (instituicao) mudarInstituicao(instituicao);
}

function atualizarHeaderInstitucional(inst) {
  const instituicao = HEADER_INSTITUICOES_INFO[inst] || HEADER_INSTITUICOES_INFO.pmesp;
  const estadoAtivo = getEstadoDaInstituicao(inst);
  const dadosEstado = HEADER_ESTADOS[estadoAtivo] || HEADER_ESTADOS.sp;

  const flagAtual = document.getElementById('header-active-flag');
  if (flagAtual) {
    const moldura = flagAtual.closest('.current-flag-frame');
    if (moldura) {
      moldura.classList.remove('brand-logo-frame');
      moldura.classList.add('institution-logo-frame');
    }
    aplicarImagemHeaderInstituicao(flagAtual, inst, dadosEstado, instituicao);
  }

  const siglaAtual = document.getElementById('header-active-sigla');
  if (siglaAtual) siglaAtual.textContent = instituicao.titulo;

  const nomeAtual = document.getElementById('header-active-name');
  if (nomeAtual) nomeAtual.textContent = instituicao.desc;

  const pmInfo = HEADER_INSTITUICOES_INFO[dadosEstado.pm];
  const bmInfo = HEADER_INSTITUICOES_INFO[dadosEstado.bm];
  const pcInfo = HEADER_INSTITUICOES_INFO[dadosEstado.pc];
  const ppInfo = HEADER_INSTITUICOES_INFO[dadosEstado.pp];

  const pmSigla = document.getElementById('header-pm-sigla');
  if (pmSigla) pmSigla.textContent = pmInfo ? pmInfo.titulo : '—';

  const bmSigla = document.getElementById('header-bm-sigla');
  if (bmSigla) bmSigla.textContent = bmInfo ? bmInfo.titulo : 'CBM';

  const pcSigla = document.getElementById('header-pc-sigla');
  if (pcSigla) pcSigla.textContent = pcInfo ? pcInfo.titulo : '—';

  const ppSigla = document.getElementById('header-pp-sigla');
  if (ppSigla) ppSigla.textContent = ppInfo ? ppInfo.titulo : 'PP';

  const ramoFederalAtivo = estadoAtivo === 'br';
  const setBranchSmall = (id, texto) => {
    const small = document.querySelector(`#${id} small`);
    if (small) small.textContent = texto;
  };
  setBranchSmall('header-branch-pm', ramoFederalAtivo ? '—' : 'Militar');
  setBranchSmall('header-branch-bm', ramoFederalAtivo ? '—' : 'Bombeiros');
  setBranchSmall('header-branch-pc', ramoFederalAtivo ? 'Federal' : 'Civil');
  setBranchSmall('header-branch-pp', ramoFederalAtivo ? 'Rodoviária' : 'Penal');

  const btnPm = document.getElementById('header-branch-pm');
  const btnBm = document.getElementById('header-branch-bm');
  const btnPc = document.getElementById('header-branch-pc');
  const btnPp = document.getElementById('header-branch-pp');
  if (btnPm) {
    const ativo = !!dadosEstado.pm && inst === dadosEstado.pm;
    btnPm.disabled = !dadosEstado.pm;
    btnPm.classList.toggle('active', ativo);
    btnPm.setAttribute('aria-pressed', ativo ? 'true' : 'false');
  }
  if (btnBm) {
    const ativo = !!dadosEstado.bm && inst === dadosEstado.bm;
    btnBm.disabled = !dadosEstado.bm;
    btnBm.classList.toggle('active', ativo);
    btnBm.setAttribute('aria-pressed', ativo ? 'true' : 'false');
  }
  if (btnPc) {
    const ativo = !!dadosEstado.pc && inst === dadosEstado.pc;
    btnPc.disabled = !dadosEstado.pc;
    btnPc.classList.toggle('active', ativo);
    btnPc.setAttribute('aria-pressed', ativo ? 'true' : 'false');
  }
  if (btnPp) {
    const ativo = !!dadosEstado.pp && inst === dadosEstado.pp;
    btnPp.disabled = !dadosEstado.pp;
    btnPp.classList.toggle('active', ativo);
    btnPp.setAttribute('aria-pressed', ativo ? 'true' : 'false');
  }

  atualizarHeaderResumo(inst);
}

function atualizarFlagsEstado(inst) {
  const estadoAtivo = getEstadoDaInstituicao(inst);
  document.querySelectorAll('.state-flag').forEach(flag => {
    const ativo = flag.dataset.estado === estadoAtivo;
    flag.classList.toggle('active', ativo);
    flag.setAttribute('aria-pressed', ativo ? 'true' : 'false');
  });
  atualizarHeaderInstitucional(inst);
}

function mudarInstituicao(novaInstituicao) {
  if (novaInstituicao === '') return;

  const configs = {
    pmac: { titulo: 'PMAC', desc: 'Polícia Militar do Acre', cor: '#006b3f', alertaPrev: 'PMAC: conferir Acreprevidência, LC AC 164/2006, tabela remuneratória, adicionais por tempo, serviço complementar, localização especial e contracheque.' },
    pmam: { titulo: "PMAM", desc: "Polícia Militar do Estado do Amazonas", cor: "#0b5d3b", alertaPrev: "PMAM/Amazonprev/Sistema de Proteção Social Militar AM: conferir contribuição, base de cálculo, posto/graduação, reserva/reforma, pensão, GAMS, gratificação de tropa, indenizações técnicas, escalas e rubricas pessoais diretamente na lei vigente e no contracheque." },
    pcac: { titulo: 'PCAC', desc: 'Polícia Civil do Acre', cor: '#5b6472', alertaPrev: 'PCAC: conferir Acreprevidência, cargo, classe, titulação, serviço complementar, tabela oficial e regra de aposentadoria policial aplicada ao caso concreto.' },
    pcap: { titulo: 'PCAP', desc: 'Polícia Civil do Estado do Amapá', cor: '#1f4e79', alertaPrev: 'PCAP/AMPRev: conferir contribuição previdenciária, abono de permanência, aposentadoria policial, subsídio por classe/padrão, plantões, funções, adicionais, diárias, retroativos e rubricas pessoais diretamente no contracheque e na norma vigente.' },
    pcce: { titulo: 'PCCE', desc: 'Polícia Civil do Estado do Ceará', cor: '#1f4e79', alertaPrev: 'PCCE/CEPREV/ISSEC: conferir contribuição previdenciária, assistência, aposentadoria policial, subsídio, plantões, adicional noturno, diárias, funções, retroativos e rubricas pessoais diretamente no contracheque e na norma vigente.' },
    ppac: { titulo: 'PPAC', desc: POLICIAS_PENAIS_INFO.ppac.nome, cor: '#536b2f', alertaPrev: `${POLICIAS_PENAIS_INFO.ppac.sigla}: ${POLICIAS_PENAIS_INFO.ppac.previdencia} ${POLICIAS_PENAIS_INFO.ppac.vantagens}` },
    ppal: { titulo: 'PPAL', desc: POLICIAS_PENAIS_INFO.ppal.nome, cor: '#6b5b2f', alertaPrev: `${POLICIAS_PENAIS_INFO.ppal.sigla}: ${POLICIAS_PENAIS_INFO.ppal.previdencia} ${POLICIAS_PENAIS_INFO.ppal.vantagens}` },
    pmesp: { titulo: "PMESP", desc: "Polícia Militar do Estado de São Paulo", cor: "#e60000", alertaPrev: "PMESP/SPPREV/SPSM: conferir a contribuição e a base de cálculo no holerite e na norma vigente. Não fixar percentual único sem validar cargo, situação funcional e rubricas." },
    bmsp: { titulo: "CBPMESP", desc: "Corpo de Bombeiros da Polícia Militar do Estado de São Paulo", cor: "#b91c1c", alertaPrev: "CBPMESP/BMSP: carreira militar estadual vinculada à PMESP; conferir SPPREV/SPSM, RETP, DEJEM, CBPM/Cruz Azul, insalubridade, escalas e rubricas no holerite e na norma vigente." },
    pcsp:  { titulo: "PCSP",  desc: "Polícia Civil do Estado de São Paulo", cor: "#4f4f4f", alertaPrev: "PCSP/SPPREV/IAMSPE: conferir contribuição previdenciária, assistência, quinquênios, sexta-parte, RETP, DEJEC, insalubridade e demais rubricas no holerite e na norma vigente. Não tratar os 14% como regra isolada sem validar base e situação funcional." },
    pmerj: { titulo: "PMERJ", desc: "Polícia Militar do Rio de Janeiro", cor: "#1E3084", alertaPrev: "RioPrevidência — 14% sobre soldo, GRET, GHP, GRAM e triênios." },
    pcerj: { titulo: "PCERJ", desc: "Polícia Civil do Rio de Janeiro",    cor: "#6B7280", alertaPrev: "RioPrevidência — 14% sobre vencimento-base, AAP/representação, GHP, GATC e adicionais remuneratórios." },
    pmmg:  { titulo: "PMMG",  desc: "Polícia Militar de Minas Gerais",     cor: "#7c1a1a", alertaPrev: "IPSM — 10,5% (8% previdência + 2,5% saúde compulsória) sobre o subsídio." },
    bmmg:  { titulo: "CBMMG", desc: "Corpo de Bombeiros Militar de Minas Gerais", cor: "#b91c1c", alertaPrev: "CBMMG/MG: conferir IPSM, contribuição previdenciária, ajuda de custo para alimentação, abono fardamento, curso/quadro e demais rubricas diretamente no contracheque. Não tratar valor de edital como total individual automático." },
    pcmg:  { titulo: "PCMG",  desc: "Polícia Civil de Minas Gerais",        cor: "#b58d3d", alertaPrev: "IPSEMG — 11% previdência + 3,2% saúde (opcional) sobre subsídio." },
    pmba:  { titulo: "PMBA",  desc: "Polícia Militar da Bahia",             cor: "#967117", alertaPrev: "Funprev-BA — 14% sobre soldo, GAP, anuênios e CET." },
    pcba:  { titulo: "PCBA",  desc: "Polícia Civil da Bahia",                cor: "#333333", alertaPrev: "Funprev-BA — 14% sobre vencimento, anuênios, CET, GIP e GQUAL." },
    pmpr:  { titulo: "PMPR",  desc: "Polícia Militar do Paraná",              cor: "#2f6b3f", alertaPrev: "ParanáPrevidência/Sistema de Proteção Social Militar: contribuição previdenciária estimada em 14% sobre base remuneratória. FASPM é facultativo e calculado somente se selecionado." },
    pcpr:  { titulo: "PCPR",  desc: "Polícia Civil do Paraná",                 cor: "#1f5e89", alertaPrev: "ParanáPrevidência: contribuição previdenciária estimada em 14% sobre base remuneratória. Verbas indenizatórias ficam destacadas sem incidência automática." },
    pmrs:  { titulo: "PMRS",  desc: "Brigada Militar do Rio Grande do Sul",     cor: "#0f3d75", alertaPrev: "IPE Prev/RS e sistema de proteção dos militares estaduais: conferir contribuição previdenciária, rubricas e auxílio-alimentação no contracheque." },
    pcrs:  { titulo: "PCRS",  desc: "Polícia Civil do Rio Grande do Sul",       cor: "#5b6472", alertaPrev: "IPE Prev/RS: contribuição previdenciária conforme regra estadual; adicionais e indenizações dependem de rubrica e situação funcional." },
    pmsc:  { titulo: "PMSC",  desc: "Polícia Militar de Santa Catarina",        cor: "#1b4f8a", alertaPrev: "IPREV/SC e sistema de proteção dos militares estaduais: conferir contribuição previdenciária, subsídio, rubricas e auxílio-alimentação no contracheque." },
    bmsc:  { titulo: "CBMSC", desc: "Corpo de Bombeiros Militar de Santa Catarina", cor: "#b91c1c", alertaPrev: "CBMSC/SC: conferir IPREV/SC, sistema de proteção social dos militares estaduais, subsídio por posto/graduação, auxílio-alimentação, diárias, indenizações e rubricas pessoais no contracheque." },
    pcsc:  { titulo: "PCSC",  desc: "Polícia Civil de Santa Catarina",          cor: "#4b5563", alertaPrev: "IPREV/SC: contribuição previdenciária conforme regra estadual; classes, subsídios e indenizações dependem de cargo, rubrica e situação funcional." },
    pmes:  { titulo: "PMES",  desc: "Polícia Militar do Espírito Santo",        cor: "#0b5c9e", alertaPrev: "IPAJM/ES e sistema estadual: conferir subsídio, referência, auxílio-alimentação, fardamento, serviço extra e demais rubricas no contracheque." },
    bmes:  { titulo: "CBMES", desc: "Corpo de Bombeiros Militar do Estado do Espírito Santo", cor: "#b91c1c", alertaPrev: "CBMES/ES: conferir IPAJM/ES, sistema de proteção social militar, subsídio por posto/graduação e referência, auxílio-alimentação, GSE, fardamento, diárias, indenizações e rubricas pessoais no contracheque." },
    pces:  { titulo: "PCES",  desc: "Polícia Civil do Espírito Santo",          cor: "#4b3f72", alertaPrev: "IPAJM/ES: contribuição previdenciária conforme regra estadual; OIP, Delegado e demais carreiras exigem conferência de categoria, referência e rubricas." },
    ppsp: { titulo: "PPSP", desc: POLICIAS_PENAIS_INFO.ppsp.nome, cor: "#6f4e37", alertaPrev: `${POLICIAS_PENAIS_INFO.ppsp.sigla}: ${POLICIAS_PENAIS_INFO.ppsp.previdencia} ${POLICIAS_PENAIS_INFO.ppsp.vantagens}` },
    pprj: { titulo: "PPRJ", desc: POLICIAS_PENAIS_INFO.pprj.nome, cor: "#5a4b81", alertaPrev: `${POLICIAS_PENAIS_INFO.pprj.sigla}: ${POLICIAS_PENAIS_INFO.pprj.previdencia} ${POLICIAS_PENAIS_INFO.pprj.vantagens}` },
    ppmg: { titulo: "PPMG", desc: POLICIAS_PENAIS_INFO.ppmg.nome, cor: "#8b5a2b", alertaPrev: `${POLICIAS_PENAIS_INFO.ppmg.sigla}: ${POLICIAS_PENAIS_INFO.ppmg.previdencia} ${POLICIAS_PENAIS_INFO.ppmg.vantagens}` },
    ppba: { titulo: "PPBA", desc: POLICIAS_PENAIS_INFO.ppba.nome, cor: "#6b5b2e", alertaPrev: `${POLICIAS_PENAIS_INFO.ppba.sigla}: ${POLICIAS_PENAIS_INFO.ppba.previdencia} ${POLICIAS_PENAIS_INFO.ppba.vantagens}` },
    pppr: { titulo: "PPPR", desc: POLICIAS_PENAIS_INFO.pppr.nome, cor: "#41644a", alertaPrev: `${POLICIAS_PENAIS_INFO.pppr.sigla}: ${POLICIAS_PENAIS_INFO.pppr.previdencia} ${POLICIAS_PENAIS_INFO.pppr.vantagens}` },
    pprs: { titulo: "PPRS", desc: POLICIAS_PENAIS_INFO.pprs.nome, cor: "#315d7c", alertaPrev: `${POLICIAS_PENAIS_INFO.pprs.sigla}: ${POLICIAS_PENAIS_INFO.pprs.previdencia} ${POLICIAS_PENAIS_INFO.pprs.vantagens}` },
    ppsc: { titulo: "PPSC", desc: POLICIAS_PENAIS_INFO.ppsc.nome, cor: "#38598b", alertaPrev: `${POLICIAS_PENAIS_INFO.ppsc.sigla}: ${POLICIAS_PENAIS_INFO.ppsc.previdencia} ${POLICIAS_PENAIS_INFO.ppsc.vantagens}` },
    ppes: { titulo: "PPES", desc: POLICIAS_PENAIS_INFO.ppes.nome, cor: "#5e548e", alertaPrev: `${POLICIAS_PENAIS_INFO.ppes.sigla}: ${POLICIAS_PENAIS_INFO.ppes.previdencia} ${POLICIAS_PENAIS_INFO.ppes.vantagens}` },
    pmms: { titulo: "PMMS", desc: "Polícia Militar de Mato Grosso do Sul", cor: "#2f5f8f", alertaPrev: "PMMS: conferir sistema de proteção social dos militares estaduais, AGEPREV/MS, regra de ingresso, averbações, reserva remunerada e reforma conforme legislação estadual." },
    bmms: { titulo: "CBMMS", desc: "Corpo de Bombeiros Militar de Mato Grosso do Sul", cor: "#b91c1c", alertaPrev: "CBMMS/MS: conferir subsídio por posto/graduação e nível, SPSM/MS, AGEPREV/MS, ajuda de custo, fardamento, indenizações, função, escala e demais rubricas no contracheque e na norma vigente." },
    pcms: { titulo: "PCMS", desc: "Polícia Civil de Mato Grosso do Sul", cor: "#4b5563", alertaPrev: "PCMS: conferir LC MS 114/2005, LC MS 343/2024, AGEPREV/MS, cargo, classe, referência, tempo em atividade policial e regra de aposentadoria aplicada." },
    ppms: { titulo: "PPMS", desc: POLICIAS_PENAIS_INFO.ppms.nome, cor: "#516b3b", alertaPrev: `${POLICIAS_PENAIS_INFO.ppms.sigla}: ${POLICIAS_PENAIS_INFO.ppms.previdencia} ${POLICIAS_PENAIS_INFO.ppms.vantagens}` },
    pmmt: { titulo: "PMMT", desc: "Polícia Militar de Mato Grosso", cor: "#1f7a4d", alertaPrev: "PMMT: conferir sistema de proteção social dos militares estaduais, MTPREV/MT, regra de ingresso, averbações, reserva remunerada e reforma conforme legislação estadual." },
    bmmt: { titulo: "CBMMT", desc: "Corpo de Bombeiros Militar do Estado de Mato Grosso", cor: "#b91c1c", alertaPrev: "CBMMT/MT: conferir MTPREV/MT, sistema de proteção social militar, subsídio por posto/graduação e nível, etapa alimentação, fardamento, diárias, indenizações, temporários, PTTC e rubricas pessoais no contracheque." },
    pcmt: { titulo: "PCMT", desc: "Polícia Judiciária Civil de Mato Grosso", cor: "#5b6472", alertaPrev: "PCMT: conferir tabela salarial do Portal do Servidor/SEPLAG-MT, cargo, classe, nível, tempo em atividade policial, MTPREV/MT e regra de aposentadoria aplicada." },
    ppmt: { titulo: "PPMT", desc: POLICIAS_PENAIS_INFO.ppmt.nome, cor: "#6b5f2f", alertaPrev: `${POLICIAS_PENAIS_INFO.ppmt.sigla}: ${POLICIAS_PENAIS_INFO.ppmt.previdencia} ${POLICIAS_PENAIS_INFO.ppmt.vantagens}` },
    pcdf: { titulo: "PCDF", desc: "Polícia Civil do Distrito Federal", cor: "#4b5563", alertaPrev: "PCDF: corporação distrital organizada e mantida pela União; conferir RPPS da União, LC 51/1985, Lei 9.264/1996, tabela federal/distrital vigente, contracheque e situação funcional individual." }
  };

  Object.assign(configs, CONFIGS_INSTITUICOES_GENERICAS || {});

  const solicitada = novaInstituicao || document.getElementById('instituicao')?.value || currInst || 'pmesp';
  const inst = configs[solicitada] ? solicitada : 'pmesp';

  // Proteção contra instituições antigas/inexistentes salvas no navegador.
  // Sem isso, uma opção inválida salva no navegador poderia travar a inicialização.
  if (!configs[solicitada]) {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* silencioso */ }
  }

  headerModoInicialPortal = false;
  currInst = inst;
  document.body.setAttribute('data-inst', inst);

  ['instituicao', 'instituicao_header', 'instituicao_home'].forEach(id => {
    const seletor = document.getElementById(id);
    if (!seletor) return;
    const existeOpcao = Array.from(seletor.options || []).some(o => o.value === inst);
    if (existeOpcao && seletor.value !== inst) seletor.value = inst;
  });

  const config = configs[inst];
  if (config?.cor) {
    document.body.style.setProperty('--vermelho', config.cor);
    document.body.style.setProperty('--vermelho-escuro', config.cor);
  }
  atualizarFlagsEstado(inst);

  // Atualiza textos visíveis
  const h1 = document.querySelector('.header-text h1');
  if (h1) h1.innerHTML = `Universo <span>Segurança Pública</span>`;
  atualizarHeaderDesc(config.desc);

  const atualizarTexto = (id, valor) => {
    const el = document.getElementById(id);
    if (el) el.textContent = valor;
  };
  atualizarTexto('txt-inst-dir', config.titulo);
  atualizarTexto('txt-inst-concursos', config.titulo);
  atualizarTexto('txt-inst-comparar', config.titulo);
  atualizarTexto('txt-inst-produtos', config.titulo);
  atualizarTexto('txt-inst-remuneracao', config.titulo);
  atualizarTexto('txt-inst-acoes', config.titulo);
  atualizarTexto('txt-inst-assoc', config.titulo);


  // Em modo MPA, cada página carrega apenas os scripts que precisa.
  // Portanto, funções de outras páginas precisam ser opcionais para não travar
  // a seleção de instituição quando o usuário estiver, por exemplo, em remuneração.
  if (typeof popularCargos === 'function') popularCargos(inst);
  if (typeof analisarDireitos === 'function') analisarDireitos();
  if (typeof carregarConcursos === 'function') carregarConcursos();
  if (typeof carregarAcoes === 'function') carregarAcoes();
  if (typeof carregarAssociacoes === 'function') carregarAssociacoes();
  if (typeof carregarRemuneracaoTabelada === 'function') carregarRemuneracaoTabelada();
  if (typeof sincronizarSeletoresConsulta === 'function') sincronizarSeletoresConsulta();
  if (document.getElementById('page-comparar')?.classList.contains('active') && typeof carregarComparadorCarreiras === 'function') carregarComparadorCarreiras();
}


/* ============================================================ */
/* === SELEÇÃO INTERNA POR ABA: ESFERA → INSTITUIÇÃO ========== */
/* ============================================================ */
const PAGINAS_COM_SELECAO_INSTITUICAO = {
  remuneracao: {
    titulo: 'Consultar remuneração por instituição',
    subtitulo: 'Escolha a esfera e depois a instituição para carregar a tabela correspondente.',
    destino: 'lista-remuneracao'
  },
  direitos: {
    titulo: 'Consultar direitos por instituição',
    subtitulo: 'A análise usa a instituição escolhida nesta aba e os dados funcionais preenchidos abaixo.',
    destino: 'resultados_dir'
  },
  brasoes: {
    titulo: 'Consultar brasão e história por instituição',
    subtitulo: 'Escolha a esfera e a instituição para ver o brasão, origem, criação, marcos históricos e dados institucionais.',
    destino: 'brasoes_historia_resultado'
  },
  concursos: {
    titulo: 'Consultar concursos por instituição',
    subtitulo: 'Escolha a esfera e a instituição para carregar os dados de edital, requisitos, etapas e fontes.',
    destino: 'lista-concursos'
  },
  acoes: {
    titulo: 'Consultar ações judiciais por instituição',
    subtitulo: 'Escolha a esfera e a instituição para ver teses, alertas e referências cadastradas.',
    destino: 'lista-acoes'
  },
  associacoes: {
    titulo: 'Consultar associações e sindicatos por instituição',
    subtitulo: 'Escolha a esfera e a instituição para localizar entidades relacionadas à carreira.',
    destino: 'lista-associacoes'
  }
};

function instituicaoConsultaFoiSelecionada() {
  return !headerModoInicialPortal && !!currInst && INSTITUICOES_VALIDAS.includes(currInst);
}

function getEsferaConsultaInstituicao(inst) {
  inst = String(inst || '').toLowerCase();
  if (inst === 'pf' || inst === 'prf' || inst === 'pcdf') return 'federal';
  return 'estadual';
}

function getRamoConsultaInstituicao(inst) {
  inst = String(inst || '').toLowerCase();
  if (inst === 'pf') return 'Polícia Federal';
  if (inst === 'prf') return 'Polícia Rodoviária Federal';
  if (inst.startsWith('bm')) return 'Bombeiro Militar';
  if (inst.startsWith('pp')) return 'Polícia Penal';
  if (inst.startsWith('pc')) return 'Polícia Civil';
  if (inst.startsWith('pm')) return inst === 'pmrs' ? 'Brigada Militar / Polícia Militar' : 'Polícia Militar';
  return 'Instituição';
}

function getOrdemConsultaInstituicao(inst) {
  const estado = getEstadoDaInstituicao(inst);
  const dadosEstado = HEADER_ESTADOS[estado] || {};
  if (inst === 'pf') return 1;
  if (inst === 'prf') return 2;
  if (inst === 'pcdf') return 3;
  if (dadosEstado.pm === inst) return 1;
  if (dadosEstado.bm === inst) return 2;
  if (dadosEstado.pc === inst) return 3;
  if (dadosEstado.pp === inst) return 4;
  return 9;
}

function getInstituicoesParaConsulta(esfera) {
  const esferaNormalizada = String(esfera || '').toLowerCase();
  let base = [];

  if (esferaNormalizada === 'federal') {
    base = ['pf', 'prf', 'pcdf'];
  } else if (esferaNormalizada === 'estadual') {
    base = INSTITUICOES_VALIDAS.filter(inst => getEsferaConsultaInstituicao(inst) === 'estadual');
  }

  return base
    .filter(inst => HEADER_INSTITUICOES_INFO[inst])
    .map(inst => {
      const estado = getEstadoDaInstituicao(inst);
      const dadosEstado = HEADER_ESTADOS[estado] || HEADER_ESTADOS.sp;
      const info = HEADER_INSTITUICOES_INFO[inst] || {};
      return {
        inst,
        estado,
        estadoNome: dadosEstado.nome || 'Brasil',
        uf: dadosEstado.sigla || estado.toUpperCase(),
        sigla: info.titulo || inst.toUpperCase(),
        nome: info.desc || inst.toUpperCase(),
        ramo: getRamoConsultaInstituicao(inst),
        ordem: getOrdemConsultaInstituicao(inst)
      };
    })
    .sort((a, b) => {
      if (a.estado !== b.estado) {
        return compararTextoPtBr(a.estadoNome, b.estadoNome);
      }
      return a.ordem - b.ordem || compararTextoPtBr(a.sigla, b.sigla);
    });
}


function criarHtmlSeletorConsulta(page, config) {
  const idEsfera = `consulta_esfera_${page}`;
  const idInstituicao = `consulta_instituicao_${page}`;
  return `
    <section class="consulta-instituicao-card" data-consulta-selector="${page}" aria-label="Seleção de instituição para esta aba">
      <div class="consulta-instituicao-texto">
        <span>Escolha dentro desta aba</span>
        <strong>${escapeHtml(config.titulo)}</strong>
        <small>${escapeHtml(config.subtitulo)}</small>
      </div>
      <div class="consulta-instituicao-grid">
        <div class="field">
          <label for="${idEsfera}">Tipo de instituição</label>
          <select id="${idEsfera}" data-consulta-esfera data-consulta-page="${page}" aria-label="Selecione se a instituição é federal ou estadual">
            <option value="" selected>Escolha a esfera</option>
            <option value="federal">Federal</option>
            <option value="estadual">Estadual</option>
          </select>
        </div>
        <div class="field">
          <label for="${idInstituicao}">Instituição</label>
          <select id="${idInstituicao}" data-consulta-instituicao data-consulta-page="${page}" aria-label="Selecione a instituição" disabled>
            <option value="">Escolha primeiro a esfera</option>
          </select>
        </div>
      </div>
    </section>
  `;
}

function inserirSeletorConsultaNaPagina(page) {
  const config = PAGINAS_COM_SELECAO_INSTITUICAO[page];
  if (!config) return;
  const pageEl = document.getElementById(`page-${page}`);
  const card = pageEl?.querySelector('.card');
  if (!card || card.querySelector(`[data-consulta-selector="${page}"]`)) return;


  const h2 = card.querySelector('h2');
  const temp = document.createElement('div');
  temp.innerHTML = criarHtmlSeletorConsulta(page, config).trim();
  const seletor = temp.firstElementChild;
  if (h2 && h2.nextSibling) card.insertBefore(seletor, h2.nextSibling);
  else card.prepend(seletor);
}

function montarSeletoresConsultaInstituicao() {
  Object.keys(PAGINAS_COM_SELECAO_INSTITUICAO).forEach(inserirSeletorConsultaNaPagina);
  sincronizarSeletoresConsulta();
}

function atualizarInstituicoesConsulta(page, esfera, valorPreferido = '') {
  const pageEl = document.getElementById(`page-${page}`);
  const seletorInst = pageEl?.querySelector('[data-consulta-instituicao]');
  if (!seletorInst) return;

  const itens = getInstituicoesParaConsulta(esfera);
  if (!itens.length) {
    seletorInst.innerHTML = '<option value="">Nenhuma instituição disponível para esta esfera</option>';
    seletorInst.disabled = true;
    return;
  }

  let html = '<option value="">Escolha a instituição</option>';
  let grupoAtual = '';
  itens.forEach(item => {
    const grupo = esfera === 'estadual' ? `${item.estadoNome} (${item.uf})` : 'União';
    if (grupo !== grupoAtual) {
      if (grupoAtual) html += '</optgroup>';
      html += `<optgroup label="${escapeHtml(grupo)}">`;
      grupoAtual = grupo;
    }
    const texto = esfera === 'estadual'
      ? `${item.sigla} — ${item.ramo}`
      : `${item.sigla} — ${item.nome}`;
    html += `<option value="${escapeHtml(item.inst)}">${escapeHtml(texto)}</option>`;
  });
  if (grupoAtual) html += '</optgroup>';

  seletorInst.disabled = false;
  seletorInst.innerHTML = html;
  if (valorPreferido && itens.some(item => item.inst === valorPreferido)) {
    seletorInst.value = valorPreferido;
  } else {
    seletorInst.value = '';
  }
}

function sincronizarSeletoresConsulta(pageUnica = '') {
  const paginas = pageUnica ? [pageUnica] : Object.keys(PAGINAS_COM_SELECAO_INSTITUICAO);
  paginas.forEach(page => {
    inserirSeletorConsultaNaPagina(page);
    const pageEl = document.getElementById(`page-${page}`);
    if (!pageEl) return;
    const esferaSelect = pageEl.querySelector('[data-consulta-esfera]');
    const instSelect = pageEl.querySelector('[data-consulta-instituicao]');
    if (!esferaSelect || !instSelect) return;

    if (!instituicaoConsultaFoiSelecionada()) {
      if (!esferaSelect.value) {
        instSelect.innerHTML = '<option value="">Escolha primeiro a esfera</option>';
        instSelect.disabled = true;
      }
      return;
    }

    const esfera = getEsferaConsultaInstituicao(currInst);
    esferaSelect.value = esfera;
    atualizarInstituicoesConsulta(page, esfera, currInst);
  });
}

function alterarEsferaConsultaInstituicao(page, esfera) {
  inserirSeletorConsultaNaPagina(page);
  if (instituicaoConsultaFoiSelecionada()) {
    aplicarHeaderInicialPortal();
  }
  atualizarInstituicoesConsulta(page, esfera, '');
  mostrarAvisoSelecaoInstituicao(page);
}

function selecionarInstituicaoConsulta(page, inst) {
  if (!inst) {
    mostrarAvisoSelecaoInstituicao(page);
    return;
  }
  mudarInstituicao(inst);
  sincronizarSeletoresConsulta();
  renderizarConteudoPaginaInstitucional(page);
  const info = HEADER_INSTITUICOES_INFO[inst];
  if (info) mostrarToast(`${info.titulo} selecionada para esta consulta.`);
}

function avisoSelecaoInstituicaoHtml(page) {
  const nomes = {
    remuneracao: 'a tabela de remuneração',
    direitos: 'a análise de direitos',
    brasoes: 'o brasão e a história institucional',
    concursos: 'os dados de concursos',
    acoes: 'as ações judiciais',
    associacoes: 'as associações e sindicatos'
  };
  return `
    <div class="consulta-vazio" role="status">
      <strong>Escolha uma instituição nesta aba.</strong>
      <span>Primeiro selecione se a instituição é federal ou estadual. Depois escolha a instituição específica para carregar ${nomes[page] || 'as informações'}.</span>
    </div>
  `;
}

function atualizarTitulosConsultaSemInstituicao() {
  [
    'txt-inst-dir',
    'txt-inst-concursos',
    'txt-inst-brasoes',
    'txt-inst-remuneracao',
    'txt-inst-acoes',
    'txt-inst-assoc'
  ].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = '—';
  });
}

function mostrarAvisoSelecaoInstituicao(page = '') {
  if (!page) return;
  atualizarTitulosConsultaSemInstituicao();

  if (page === 'remuneracao') {
    const tbody = document.getElementById('lista-remuneracao');
    if (tbody) tbody.innerHTML = `<tr><td colspan="4">Escolha uma instituição nesta aba para carregar a tabela.</td></tr>`;
    const total = document.getElementById('remu-total-cargos');
    const menor = document.getElementById('remu-menor-total');
    const maior = document.getElementById('remu-maior-total');
    if (total) total.textContent = '0';
    if (menor) menor.textContent = '—';
    if (maior) maior.textContent = '—';
    return;
  }

  if (page === 'direitos') {
    const cargo = document.getElementById('cargo_dir');
    if (cargo && !instituicaoConsultaFoiSelecionada()) cargo.innerHTML = '<option value="">Selecione uma instituição primeiro</option>';
    const cont = document.getElementById('resultados_dir');
    if (cont) cont.innerHTML = avisoSelecaoInstituicaoHtml(page);
    return;
  }

  const destino = PAGINAS_COM_SELECAO_INSTITUICAO[page]?.destino;
  const cont = destino ? document.getElementById(destino) : null;
  if (cont) cont.innerHTML = avisoSelecaoInstituicaoHtml(page);
}

function limparConsultaInstitucionalInicial() {
  montarSeletoresConsultaInstituicao();
  atualizarTitulosConsultaSemInstituicao();
  Object.keys(PAGINAS_COM_SELECAO_INSTITUICAO).forEach(mostrarAvisoSelecaoInstituicao);
}

function renderizarConteudoPaginaInstitucional(page) {
  if (!instituicaoConsultaFoiSelecionada()) {
    mostrarAvisoSelecaoInstituicao(page);
    return;
  }

  sincronizarSeletoresConsulta(page);

  if (page === 'direitos') {
    popularCargos(currInst);
    analisarDireitos();
  } else if (page === 'concursos') {
    carregarConcursos();
  } else if (page === 'brasoes') {
    renderizarBrasoesHistoria();
  } else if (page === 'acoes') {
    carregarAcoes();
  } else if (page === 'associacoes') {
    carregarAssociacoes();
  } else if (page === 'remuneracao') {
    carregarRemuneracaoTabelada();
  }
}

function prepararPaginaComSelecaoInstituicao(page) {
  if (!PAGINAS_COM_SELECAO_INSTITUICAO[page]) return false;
  montarSeletoresConsultaInstituicao();
  if (!instituicaoConsultaFoiSelecionada()) {
    mostrarAvisoSelecaoInstituicao(page);
    return true;
  }
  renderizarConteudoPaginaInstitucional(page);
  return true;
}



function obterResumoInstituicaoCompleto(inst) {
  const info = HEADER_INSTITUICOES_INFO[inst] || {};
  const resumo = HEADER_INSTITUICOES_RESUMO[inst] || {};
  const estadoChave = getEstadoDaInstituicao(inst);
  const estado = HEADER_ESTADOS[estadoChave] || {};
  const sigla = resumo.sigla || info.titulo || String(inst || '').toUpperCase();
  const nome = resumo.nome || info.desc || sigla;
  const tipo = resumo.tipo || resumoInferirTipo(inst, resumo);
  const uf = resumo.estadoSigla || estado.sigla || (getEsferaConsultaInstituicao(inst) === 'federal' ? 'BR' : '—');
  const estadoNome = resumo.estado || estado.nome || 'Brasil';
  return { info, resumo, estadoChave, estado, sigla, nome, tipo, uf, estadoNome };
}

function valorHistoriaOuNaoDeclarado(valor, alternativo = 'Informação específica a confirmar em fonte oficial') {
  if (typeof resumoEhDadoPendente === 'function' && resumoEhDadoPendente(valor)) return alternativo;
  const texto = String(valor || '').trim();
  if (!texto || texto === RESUMO_DADOS_EM_BREVE || /dados em breve/i.test(texto)) return alternativo;
  return texto;
}

function imagemPrincipalBrasaoInstituicao(inst) {
  const caminho = HEADER_INSTITUICOES_IMAGENS?.[inst] || '';
  const candidatos = montarCandidatosImagemInstituicao(inst, caminho);
  return candidatos[0] || caminho || 'img/LOGO/logoleao.webp';
}

function getCriadorInstitucional(inst, tipo, estadoNome) {
  if (inst === 'pmesp') return 'Brigadeiro Rafael Tobias de Aguiar — então presidente da Província de São Paulo, pela lei provincial de 15/12/1831.';
  if (inst === 'pmam') return 'Província do Amazonas — criação da Guarda Policial em 04/04/1837; a denominação Polícia Militar do Amazonas foi consolidada em 14/11/1938.';
  if (inst === 'pcam') return 'Estado do Amazonas — organização histórica da Polícia Judiciária de carreira em 1922; Decreto AM nº 2.291/1972 regulamentou a estrutura orgânica da Polícia Civil.';
  if (inst === 'pcap') return 'Estado do Amapá — Lei AP nº 637, de 14/12/2001, estruturou a organização básica da Polícia Civil; Lei AP nº 883/2005 consolidou órgãos de direção superior como a Delegacia-Geral.';
  if (inst === 'pcce') return 'Príncipe Regente D. João — Alvará de 10/05/1808, origem histórica da polícia judiciária brasileira; no Ceará, carreira organizada pelo Estatuto da Polícia Civil, Lei CE nº 12.124/1993, e normas posteriores.';
  if (inst === 'pmap') return 'Presidência da República — Lei Federal nº 6.270, de 26/11/1975, sancionada por Ernesto Geisel, criou a Polícia Militar do Território Federal do Amapá; antecedente histórico: Guarda Territorial do Amapá.';
  if (inst === 'pmal') return 'Presidência da Província de Alagoas e Ministério da Justiça do Império — Decisão Imperial nº 52, de 03/02/1832, aprovando corpo policial provincial.';
  if (inst === 'pcal') return 'Estado de Alagoas — Lei AL nº 3.437, de 25/06/1975, estrutura cargos da Polícia Civil; Lei AL nº 6.441/2003 concede autonomia administrativa e financeira.';
  if (inst === 'ppal') return 'Estado de Alagoas — Lei AL nº 7.993/2018 reestruturou a carreira; Lei AL nº 8.650/2022 redenominou Agentes Penitenciários para Policiais Penais; Lei AL nº 9.849/2026 atualizou jornada e subsídios.';
  if (inst === 'pmerj') return 'D. João VI — criação da Divisão Militar da Guarda Real da Polícia da Corte em 13/05/1809.';
  if (inst === 'bmms') return 'Governo de Mato Grosso — Lei MT nº 3.322/1973, origem histórica do Comando do Corpo de Bombeiros; Mato Grosso do Sul reorganizou a corporação após a criação do Estado.';
  if (inst === 'bmmg') return 'Júlio Bueno Brandão — Lei MG nº 557, de 31/08/1911, que autorizou a organização da Seção de Bombeiros Profissionais.';
  if (inst === 'bmpr') return 'Carlos Cavalcanti de Albuquerque — Lei PR nº 1.133, de 23/03/1912, que criou o Corpo de Bombeiros do Estado do Paraná.';
  if (inst === 'bmsc') return 'Antônio Vicente Bulcão Vianna — instalação da Seção de Bombeiros da Força Pública em 26/09/1926; origem autorizada pela Lei SC nº 1.288/1919 no governo Hercílio Luz.';
  if (inst === 'bmes') return 'Marcondes Alves de Souza — Lei ES nº 874, de 26/12/1912; primeira estrutura efetiva pela Lei ES nº 920, de 13/11/1913.';
  if (inst === 'bmmt') return 'Fernando Corrêa da Costa — Lei MT nº 2.184, de 19/08/1964; autonomia institucional em 28/10/1994.';
  if (inst === 'bmrj') return 'Dom Pedro II — Decreto Imperial nº 1.775, de 02/07/1856, criou o Corpo Provisório de Bombeiros da Corte.';
  const esfera = getEsferaConsultaInstituicao(inst);
  if (inst === 'pf') return 'União — estrutura federal organizada pela Constituição, legislação federal e atos do Poder Executivo federal.';
  if (inst === 'prf') return 'Presidente Washington Luís — Decreto nº 18.323/1928 criou a Polícia das Estradas, origem histórica da PRF.';
  if (/Polícia Penal/i.test(tipo)) return `${estadoNome} — carreira constitucionalizada pela EC 104/2019 e estruturada por normas estaduais/distritais.`;
  if (/Bombeiro/i.test(tipo)) return `${estadoNome} — poder público estadual/distrital, com organização militar e comando próprio conforme legislação local.`;
  if (/Polícia Civil/i.test(tipo)) return `${estadoNome} — poder público estadual/distrital, com organização da polícia judiciária conforme legislação local.`;
  return `${estadoNome} — poder público estadual/distrital, por ato legal de organização da força pública local.`;
}

function getHistoricoPorTipo(inst, dados) {
  const { sigla, nome, tipo, estadoNome, resumo } = dados;
  const criacao = valorHistoriaOuNaoDeclarado(resumo.criacao, 'origem histórica organizada pela legislação própria da instituição');
  const esfera = getEsferaConsultaInstituicao(inst);

  if (inst === 'pmesp') {
    return {
      origem: `A ${nome} tem origem histórica em 15 de dezembro de 1831, quando foi criada em São Paulo a força pública provincial que se tornaria a Polícia Militar do Estado de São Paulo. Em 2026, a instituição teve atualização relevante de comando, efetivo legal e carreira, com a posse da Cel PM Glauce Anselmo Cavalli no Comando-Geral e a Lei SP 18.442/2026 reorganizando efetivo, quadros, regime jurídico e regras gerais de promoção.`,
      marcos: [
        'Criação da força pública paulista em 15/12/1831, associada ao governo provincial de Rafael Tobias de Aguiar.',
        'Consolidação como força militar estadual com atuação em policiamento ostensivo, preservação da ordem pública e apoio em crises.',
        'Estrutura institucional organizada em órgãos de direção geral, direção setorial, apoio, execução e assessoria, conforme página oficial de organização da PMESP.',
        'Lei SP 18.442/2026: efetivo legal de 93.802 cargos, com quadros QOEM, QOE, QOS, QOM, QORR e QP e regras gerais de promoção.',
        'Lei SP 18.441/2026: vencimentos-base reclassificados a partir de 01/04/2026; remuneração total deve ser conferida em tabela oficial posterior quando disponível.',
        '2026: Cel PM Glauce Anselmo Cavalli assume o Comando-Geral, primeira mulher a comandar a PMESP.'
      ]
    };
  }

  if (inst === 'pmam') {
    return {
      origem: `A ${nome} tem origem histórica em 4 de abril de 1837, com a criação da Guarda Policial da então Província do Amazonas, e passou por reorganizações como Corpo Policial, Regimento Militar do Estado e Força Pública até adotar a denominação Polícia Militar do Amazonas em 14 de novembro de 1938. Em 2026, a PMAM segue como força militar estadual de policiamento ostensivo e preservação da ordem pública, com convocações do concurso FGV/2021 e tabela remuneratória atualizada pela Lei AM nº 7.445/2025.`,
      marcos: [
        '1837: criação da Guarda Policial da Província do Amazonas, marco histórico de origem da PMAM.',
        '1887: Lei nº 761 reorganiza a força como Corpo Policial; em 1890, o Decreto nº 2 reorganiza a força pública estadual.',
        '1935: Lei nº 55 muda a denominação para Força Policial do Estado; em 14/11/1938, a instituição passa a ser denominada Polícia Militar do Amazonas.',
        '1983: marco de comando com primeiro oficial da ativa da própria PMAM no Comando-Geral, conforme histórico institucional.',
        '2021/2022: edital FGV PMAM com 1.350 vagas para Aluno Soldado, Aluno Oficial e Oficial de Saúde.',
        '2025: Lei AM nº 7.445 atualiza a remuneração dos policiais e bombeiros militares do Amazonas, com efeitos principais em 01/12/2025.',
        '2026: Governo do Amazonas informa formação de 500 novos policiais e ampliação das convocações do concurso de 2021.'
      ]
    };
  }

  if (inst === 'pcam') {
    return {
      origem: `A ${nome} tem raízes na polícia judiciária brasileira organizada a partir do Alvará Régio de 10 de maio de 1808 e na estrutura provincial do Amazonas. No Estado, a página histórica da instituição registra a criação da Polícia Judiciária de carreira em 1922, a organização da Polícia Civil com carreiras funcionais em 1971 e a regulamentação da estrutura orgânica pelo Decreto nº 2.291, de 12 de maio de 1972. Em 2026, a PCAM segue dirigida pelo Delegado Bruno de Paula Fraga, com remuneração atualizada pela Lei AM nº 7.446/2025 e reforço de efetivo oriundo do concurso FGV 2021/2022.`,
      marcos: [
        '1808: marco nacional da polícia judiciária com a Intendência Geral de Polícia da Corte e do Brasil, referência histórica das Polícias Civis brasileiras.',
        '1854: criação do cargo de Chefe de Polícia para a Província do Amazonas; Policarpo Nunes Leão é registrado como primeiro chefe de polícia nomeado no período imperial.',
        '1871: Lei nº 2.033 separa funções policiais e judiciais e consolida o inquérito policial como instrumento central da investigação criminal.',
        '1922: o Estado do Amazonas cria a Polícia Judiciária de carreira, formalizando a Polícia Civil e suas carreiras no plano estadual.',
        '1971/1972: Emenda Constitucional Estadual nº 03/1971 organiza carreiras funcionais e o Decreto AM nº 2.291/1972 regulamenta a Delegacia-Geral, delegacias especializadas, distritos, regionais e apoio técnico.',
        '2004: Lei AM nº 2.875 institui plano de classificação, cargos, carreiras e remuneração dos servidores da Polícia Civil do Amazonas.',
        '2025: Lei AM nº 7.446 atualiza a remuneração dos servidores da Polícia Civil, com implementação principal a partir de 01/12/2025 e pagamento de diferenças em 2026.',
        '2026: posse de 97 novos policiais aprovados no concurso PCAM/FGV 2021/2022, incluindo delegados, escrivães, investigadores e peritos.'
      ]
    };
  }


  if (inst === 'pcap') {
    return {
      origem: `A ${nome} é a polícia judiciária estadual do Amapá, com trajetória ligada à organização administrativa do antigo Território Federal e à consolidação do Estado do Amapá. A página histórica institucional registra a Lei AP nº 637, de 14 de dezembro de 2001, como marco da estrutura organizacional básica da Polícia Civil, e a Lei AP nº 883/2005 posiciona a Delegacia-Geral entre os órgãos de direção superior. Em 2026, a PCAP segue dirigida pelo Delegado Victor Crispim Vinagre e utiliza tabela de subsídios do Grupo Polícia Civil com vigência de 01/04/2024, sem somar rubricas pessoais automaticamente.`,
      marcos: [
        'Antecedentes territoriais: organização da polícia judiciária no antigo Território Federal do Amapá, antes da consolidação da estrutura estadual própria.',
        '14/12/2001: Lei AP nº 637 aprova a estrutura organizacional básica da Polícia Civil do Estado do Amapá, marco institucional citado no histórico oficial.',
        '2005: Lei AP nº 883 organiza a Delegacia-Geral de Polícia Civil como órgão de direção superior, com papel de coordenação da instituição.',
        '2017/2026: concurso PCAP 2017 segue com convocações, matrículas em curso de formação e atos administrativos publicados pela SEAD/AP.',
        '2024: Lei AP nº 3.037 atualiza a tabela de subsídios do Grupo Polícia Civil, com vigência informada a partir de 01/04/2024.',
        '2026: Diário Oficial registra Victor Crispim Vinagre como Delegado-Geral de Polícia Civil e Presidente do Conselho Superior da Polícia Civil.',
        '2026: novo concurso para Delegado e Oficial Investigador aparece em planejamento público, mas não deve ser tratado como edital aberto até publicação oficial da SEAD/AP.'
      ]
    };
  }

  if (inst === 'pcce') {
    return {
      origem: `A ${nome} é a polícia judiciária estadual do Ceará e sua origem histórica é vinculada ao Alvará de 10 de maio de 1808, que criou a Intendência Geral de Polícia da Corte e do Brasil. No plano estadual, a carreira foi estruturada pelo Estatuto da Polícia Civil do Ceará e por leis posteriores que modernizaram direção, cargos e remuneração. Em 2026, a PCCE está sob comando do Delegado Márcio Rodrigo Gutiérrez Rocha, com concursos recentes para Delegado e Oficial Investigador e ampliação legal de cargos pela Lei CE nº 19.706/2026.`,
      marcos: [
        '10/05/1808: marco histórico nacional da polícia judiciária, com a criação da Intendência Geral de Polícia da Corte e do Brasil por alvará do Príncipe Regente D. João.',
        '1841: Lei nº 261 reorganiza a polícia no Império e consolida delegados e subdelegados sob a autoridade do Chefe de Polícia, referência histórica das polícias civis estaduais.',
        '1969: publicação do primeiro Estatuto da Polícia Civil de Carreira do Estado do Ceará, marco de profissionalização citado no histórico institucional.',
        '1993: Lei CE nº 12.124 institui o Estatuto da Polícia Civil de Carreira do Estado do Ceará, base funcional da carreira.',
        '2011: Lei CE nº 14.868 muda a nomenclatura para Delegado-Geral e Delegado-Geral Adjunto, aproximando a estrutura do modelo atual.',
        '2024/2025: Lei CE nº 19.128/2024 e Lei CE nº 19.186/2025 reorganizam a carreira de Oficial Investigador de Polícia e o curso de formação.',
        '2025/2026: concursos para Delegado e Oficial Investigador seguem em andamento por Cebraspe e CEV/UECE/FUNECE, com etapas, resultados e convocações publicadas oficialmente.',
        '2026: Lei CE nº 19.706 cria 2.000 cargos de Oficial Investigador de Polícia e amplia o aproveitamento de candidatos aprovados, sem dispensar leitura de edital, ato de nomeação e disponibilidade orçamentária.'
      ]
    };
  }
  if (inst === 'pmap') {
    return {
      origem: `A ${nome} tem origem formal na Lei Federal nº 6.270, de 26 de novembro de 1975, que criou a Polícia Militar do Território Federal do Amapá, a partir da transformação histórica da Guarda Territorial. Em 2026, a PMAP segue como força militar estadual de policiamento ostensivo e preservação da ordem pública, com comando atualizado para o Cel PM Márcio Allan e tabela remuneratória estadual organizada por subsídio e progressão horizontal pela LC AP nº 173/2025.`,
      marcos: [
        'Antecedente histórico: Guarda Territorial do Amapá, sediada na Fortaleza de São José de Macapá, com mais de três décadas de atuação no antigo Território Federal.',
        '1969: o Decreto-Lei nº 411 previu a transformação das Guardas Territoriais em Polícias Militares nos territórios federais.',
        '26/11/1975: Lei Federal nº 6.270 cria a Polícia Militar do Território Federal do Amapá, com missão de manutenção da ordem pública e policiamento ostensivo fardado.',
        'Após a estadualização do Amapá, a PMAP consolidou-se como polícia militar estadual, força auxiliar e reserva do Exército, com atuação ostensiva, preventiva e especializada.',
        '2022/2026: concurso de Soldado PMAP/FCC com cadastro de reserva e convocações sucessivas publicadas pela SEAD/AP.',
        '2025: LC AP nº 173 altera a remuneração dos militares estaduais e fixa subsídio por posto/graduação e tempo de efetivo serviço, com tabelas de 2025 a 2028.',
        '2026: Governo do Amapá oficializa passagem de comando da PMAP para o Cel PM Márcio Allan.'
      ]
    };
  }

  if (inst === 'pmal') {
    return {
      origem: `A ${nome} tem origem oficial reconhecida em 3 de fevereiro de 1832, quando a Decisão Imperial nº 52 aprovou a organização policial provincial de Alagoas. Em 2026, a PMAL aparece como corporação quase bicentenária, com atuação de policiamento ostensivo e preservação da ordem pública nos 102 municípios alagoanos, efetivo ativo informado de 7.493 integrantes e Comando-Geral exercido pelo Cel QOC PM Paulo Amorim Feitosa Filho.`,
      marcos: [
        '1832: Decisão Imperial nº 52 aprova a organização policial provincial de Alagoas, marco reconhecido da origem da PMAL.',
        '1851: criação da Banda de Música da PMAL, posteriormente reconhecida como patrimônio histórico, artístico e cultural imaterial do povo alagoano.',
        '1912: extinção e reativação da Força Pública/Batalhão de Polícia no mesmo ano, marco de reorganização institucional.',
        '1947/1993: criação da Formação de Bombeiros dentro da PM e posterior autonomia do Corpo de Bombeiros Militar de Alagoas.',
        '1991: Decreto nº 35.021 passa a regular assistência médico-hospitalar do policial militar e dependentes.',
        '2014: Lei AL nº 7.580 fixa subsídios dos militares estaduais; usar tabela por posto/graduação com cautela em atualizações posteriores.',
        '2022: Lei AL nº 8.671 disciplina o Sistema de Proteção Social dos Militares do Estado de Alagoas — SPSM/AL.',
        '2026: edital PMAL/Cebraspe para CFO e CFP, com 530 vagas imediatas e cadastro de reserva.'
      ]
    };
  }

  if (inst === 'pcal') {
    return {
      origem: `A ${nome} é a polícia judiciária estadual de Alagoas, com raízes administrativas na reorganização policial estadual de 1912 e estrutura policial civil consolidada pela Lei AL nº 3.437/1975. A Lei AL nº 6.441/2003 marcou a autonomia administrativa e financeira da instituição, e em 2026 o Governo de Alagoas formou comissão para novo concurso de Agente e Escrivão, com 300 vagas previstas.`,
      marcos: [
        '1808: criação da Intendência Geral de Polícia da Corte e do Brasil, marco nacional de organização policial que antecede as polícias civis estaduais.',
        '1912: reorganização das forças estaduais em Alagoas, formando a estrutura policial estadual moderna.',
        '1975: Lei AL nº 3.437 institui cargos e estrutura a Polícia Civil do Estado de Alagoas.',
        '1982: criação da Escola de Polícia Civil de Alagoas — EPOCA, depois Academia de Polícia de Alagoas/APOCAL.',
        '1987: carreira de Delegado de Polícia Civil e departamentos de polícia judiciária ganham desenho próprio.',
        '2003: Lei AL nº 6.441 concede autonomia administrativa e financeira à Polícia Civil e organiza a Direção-Geral.',
        '2007: Lei Delegada nº 43 reorganiza a estrutura, incluindo Delegado-Geral e diretorias.',
        '2026: Governo de Alagoas divulga comissão para concurso PCAL de Agente e Escrivão, com 150 vagas imediatas e 150 cadastro de reserva.'
      ]
    };
  }


  if (inst === 'ppal') {
    return {
      origem: `A ${nome} integra a segurança pública estadual como carreira constitucionalizada pela EC 104/2019. Em Alagoas, a base funcional vem da carreira de Agente Penitenciário reestruturada pela Lei AL nº 7.993/2018 e redenominada pela Lei AL nº 8.650/2022 como carreira de Policiais Penais. A gestão do sistema prisional é executada pela SERIS/AL, responsável pela administração das unidades, custódia, disciplina, ressocialização e programas de inclusão social. Em 2026, a Lei AL nº 9.849 atualizou a jornada de 40h, a escala 24x72 em regime de plantão e a tabela de subsídios da carreira.`,
      marcos: [
        '1995: Lei AL nº 5.676 cria a Secretaria de Justiça, marco da gestão penitenciária estadual especializada.',
        '2004: Lei AL nº 6.448 cria a Secretaria Executiva de Ressocialização, com foco na execução penal e administração prisional.',
        '2015: Lei Delegada nº 47 estrutura a SERIS no modelo contemporâneo de ressocialização e inclusão social.',
        '2018: Lei AL nº 7.993 reestrutura a carreira de Agente Penitenciário do serviço civil estadual.',
        '2019/2022: EC 104/2019 constitucionaliza a Polícia Penal; Lei AL nº 8.650/2022 redenomina a carreira para Policiais Penais.',
        '2021/2022: concurso SERIS/AL Cebraspe oferta 300 vagas e reforça o quadro de policiais penais.',
        '2026: Lei AL nº 9.849 fixa jornada de 40h, escala 24x72 quando em plantão e subsídios de R$ 7.200,00 a R$ 17.734,04.',
        '2026: mapa SERIS indica 6.386 presos recolhidos nas unidades prisionais em abril/maio de 2026.'
      ]
    };
  }

  if (inst === 'bmms') {
    return {
      origem: `O ${nome} tem origem histórica no Comando do Corpo de Bombeiros Militar criado em 16 de abril de 1973 pela Lei MT nº 3.322, ainda no antigo Estado de Mato Grosso, com destacamentos em Campo Grande e Corumbá. Com a criação de Mato Grosso do Sul, consolidou-se como corporação militar estadual de prevenção, combate a incêndios, salvamento, atendimento emergencial, defesa civil e segurança contra incêndio e pânico.`,
      marcos: [
        '1971: inauguração do quartel em Campo Grande, marco operacional anterior à criação formal do comando.',
        '1973: Lei MT nº 3.322 cria o Comando do Corpo de Bombeiros Militar no antigo Mato Grosso.',
        '1974: Lei MT nº 3.539 organiza o Comando e o Estado-Maior do Corpo de Bombeiros Militar.',
        '1979: com a criação de Mato Grosso do Sul, o serviço passa a integrar a estrutura militar estadual sul-mato-grossense.',
        '2008: LC MS nº 127 institui o sistema remuneratório por subsídio para PMMS e CBMMS.',
        '2014: LC MS nº 188 dispõe sobre a organização básica do CBMMS.',
        '2025: LC MS nº 354 fixa o efetivo legal do CBMMS em 3.978 integrantes.',
        '2026: Lei MS nº 6.562 aplica RGA de 3,81% ao subsídio dos servidores estaduais.'
      ]
    };
  }

  if (inst === 'bmmg') {
    return {
      origem: `O ${nome} tem origem na Lei MG nº 557, de 31 de agosto de 1911, que autorizou a organização da Seção de Bombeiros Profissionais em Minas Gerais. A corporação consolidou-se como instituição militar estadual voltada à prevenção e combate a incêndios, salvamento, atendimento pré-hospitalar, defesa civil e segurança contra incêndio e pânico, com autonomia institucional e presença operacional em dezenas de municípios mineiros.`,
      marcos: [
        '1911: Lei MG nº 557 autoriza a organização da Seção de Bombeiros Profissionais em Minas Gerais.',
        '1913: registros históricos apontam os primeiros grandes atendimentos operacionais do serviço de bombeiros em Belo Horizonte.',
        'Décadas seguintes: expansão de pelotões, batalhões e unidades operacionais no interior do Estado.',
        '1999: consolidação da autonomia institucional do Corpo de Bombeiros Militar de Minas Gerais.',
        '2016: Lei MG nº 22.415 fixa o efetivo legal do CBMMG em 7.999 cargos.',
        '2025: Cel BM Jordana de Oliveira Filgueiras Daldegan assume o Comando-Geral do CBMMG.',
        '2026: Lei MG nº 25.804 aplica revisão geral de 5,4% e editais CBMMG 09/2026 e 10/2026 abrem novo ciclo de ingresso.'
      ]
    };
  }


  if (inst === 'bmpr') {
    return {
      origem: `O Corpo de Bombeiros Militar do Paraná tem antecedentes na Lei Provincial nº 679, de 27 de outubro de 1882, e foi criado formalmente pela Lei PR nº 1.133, de 23 de março de 1912. Em 2026, a instituição atua como corporação militar estadual dedicada à prevenção e combate a incêndios, salvamento, atendimento pré-hospitalar, defesa civil e atividades técnicas, sob comando do Cel QOBM Antônio Geraldo Hiller Lino.`,
      marcos: [
        '1882: Lei Provincial nº 679 autoriza a organização do serviço de bombeiros na província do Paraná.',
        '1912: Lei PR nº 1.133 cria o Corpo de Bombeiros do Estado do Paraná.',
        'Consolidação da atuação estadual em incêndios, salvamento, SIATE, defesa civil, prevenção e segurança contra incêndio e pânico.',
        'Lei PR nº 22.187/2024: reestrutura a carreira militar estadual e tabela de subsídio do Quadro da Polícia Militar e do Quadro Bombeiro Militar do Paraná.',
        'Lei PR nº 22.916/2025: fixa o efetivo do CBMPR em 5.704 cargos.',
        '2025: Cel QOBM Antônio Geraldo Hiller Lino assume o Comando-Geral do CBMPR.',
        'Concursos 2025: Soldado Bombeiro Militar com 600 vagas e Cadete Bombeiro Militar com 20 vagas.'
      ]
    };
  }


  if (inst === 'bmsc') {
    return {
      origem: `O ${nome} tem origem operacional na instalação da Seção de Bombeiros da Força Pública de Santa Catarina, em 26 de setembro de 1926, em Florianópolis, após autorização legal anterior para organização do serviço. A corporação tornou-se autônoma com a Emenda Constitucional estadual nº 33/2003 e atua em prevenção, combate a incêndio, salvamento, atendimento pré-hospitalar, defesa civil e segurança contra incêndio e pânico.`,
      marcos: [
        '1919: Lei SC nº 1.288 autoriza a criação de uma Seção de Bombeiros vinculada à Força Pública de Santa Catarina.',
        '1926: instalação da Seção de Bombeiros em Florianópolis, em 26/09/1926, marco histórico da corporação.',
        '2003: Emenda Constitucional estadual nº 33 concede autonomia administrativa e financeira ao CBMSC.',
        '2025: nova organização básica amplia a estrutura regional de três para cinco Regiões Bombeiro Militar e cria novas diretorias setoriais.',
        'LC SC 872/2025: reajuste remuneratório em três etapas, com efeitos em 05/2025, 12/2025 e 04/2026.',
        'LC SC 880/2025: cria o Serviço Militar Estadual Temporário e o Quadro de Oficiais Especialistas, com impacto estrutural no efetivo projetado.',
        'Concursos 2026: editais CBMSC/IDIB para 100 vagas de Aluno-Soldado e 10 vagas de Cadete/Oficial, ambos com nível superior.'
      ]
    };
  }


  if (inst === 'bmes') {
    return {
      origem: `O ${nome} tem origem legal na Lei ES nº 874, de 26 de dezembro de 1912, sancionada por Marcondes Alves de Souza, e teve a primeira estrutura operacional implantada pela Lei ES nº 920, de 13 de novembro de 1913. A corporação se consolidou como instituição militar estadual de prevenção, combate a incêndios, salvamento, defesa civil, perícias de incêndio e segurança contra incêndio e pânico, com autonomia institucional após a Emenda Constitucional estadual nº 12/1997.`,
      marcos: [
        '1912: Lei ES nº 874 determina a criação do Corpo de Bombeiros no Espírito Santo.',
        '1913: Lei ES nº 920 implanta a primeira Seção de Bombeiros, com um cabo, 12 soldados e comando do 1º Ten Ignácio Pinto de Siqueira.',
        'Treinamento inicial organizado com apoio do 2º Ten Mário Francisco de Brito, oficial do Corpo de Bombeiros do Rio de Janeiro.',
        '1921 a 1938: evolução nominal e estrutural de Seção para Pelotão, Companhia e Corpo de Bombeiros.',
        '1997: Emenda Constitucional estadual nº 12 permite a desvinculação da Polícia Militar e consolida o Corpo de Bombeiros Militar como instituição autônoma.',
        'LC ES 420/2007: remuneração dos militares estaduais por subsídio; LC ES 910/2019 e LC ES 911/2019 tratam de promoções de oficiais e praças.',
        '2026: CFO CBMES/IDECAN abre 6 vagas imediatas e 400 de cadastro de reserva para Oficial Combatente Bombeiro Militar.'
      ]
    };
  }

  if (inst === 'bmmt') {
    return {
      origem: `O ${nome} tem origem legal em 19 de agosto de 1964, com a autorização para organização do serviço de bombeiros em Mato Grosso, e iniciou a operação em fevereiro de 1967 como 1ª Companhia Independente, com 42 homens. A autonomia institucional foi consolidada em 28 de outubro de 1994. Em 2026, a corporação atua como instituição militar estadual de prevenção, combate a incêndios, busca e salvamento, defesa civil, atendimento emergencial e segurança contra incêndio e pânico, sob comando do Cel BM Flávio Glêdson Vieira Bezerra.`,
      marcos: [
        '1964: Lei MT nº 2.184 autoriza a organização do serviço de bombeiros no Estado de Mato Grosso.',
        '1967: início operacional em Cuiabá como 1ª Companhia Independente, com 42 homens.',
        '1994: autonomia institucional do Corpo de Bombeiros Militar de Mato Grosso em 28/10/1994.',
        'LC MT 541/2014: estrutura a remuneração/subsídio dos militares estaduais, com referências usadas na aba de remuneração.',
        'LC MT 775/2023: organiza a estrutura básica do CBMMT, com níveis de direção geral, superior, assessoramento, execução programática e regionalizada.',
        '2025/2026: publicações institucionais indicam expansão operacional, Grupamento de Aviação Bombeiro Militar e cobertura aproximada de 70% a 80% da população.',
        'Editais SEPLAG/SESP/CBMMT 2022: referências cadastradas para Aluno-a-Oficial, Aspirante e concursos de ingresso; convocações posteriores devem ser conferidas no site oficial.'
      ]
    };
  }

  if (inst === 'bmrj') {
    return {
      origem: `O ${nome} tem origem no Corpo Provisório de Bombeiros da Corte, criado pelo Decreto Imperial nº 1.775, de 2 de julho de 1856, no período de Dom Pedro II. Reconhecido como o primeiro corpo de bombeiros do Brasil, o CBMERJ atua em prevenção, combate a incêndios, salvamento, atendimento pré-hospitalar, defesa civil e respostas emergenciais no Estado do Rio de Janeiro, vinculado à SEDEC/RJ.`,
      marcos: [
        '1856: criação do Corpo Provisório de Bombeiros da Corte pelo Decreto Imperial nº 1.775, de 2 de julho.',
        'Consolidação histórica como referência nacional em combate a incêndios, salvamento e resposta a emergências urbanas.',
        '1979: Lei RJ nº 279 organiza a remuneração dos militares estaduais do RJ, incluindo o Corpo de Bombeiros.',
        '1985: Lei RJ nº 880 estabelece o Estatuto dos Bombeiros Militares do Estado do Rio de Janeiro.',
        '2021: Lei RJ nº 9.537 organiza o Sistema de Proteção Social dos Militares do Estado do Rio de Janeiro.',
        '2024: Cel BM Tarciso Antonio de Salles Junior assume a SEDEC/RJ e o Comando-Geral do CBMERJ.',
        '2026: tabela SEDEC/GESPERJ de janeiro/2026 passa a ser usada no portal para remuneração bruta oficial por posto/graduação.'
      ]
    };
  }

  if (inst === 'pf') {
    return {
      origem: `A ${nome} é órgão permanente da União e atua como polícia judiciária federal, responsável por investigar crimes de competência federal, proteger interesses da União e executar atribuições especializadas em fronteiras, migração, polícia marítima, aeroportuária e de combate a crimes interestaduais ou internacionais.`,
      marcos: [
        'Consolidação constitucional como órgão da segurança pública federal no art. 144 da Constituição.',
        'Atuação em investigações federais, cooperação internacional, controle migratório e repressão a crimes contra bens, serviços e interesses da União.',
        'Ampliação de capacidades técnicas em perícia, inteligência, operações especiais, crimes cibernéticos e enfrentamento de organizações criminosas.'
      ]
    };
  }

  if (inst === 'prf') {
    return {
      origem: `A Polícia Rodoviária Federal tem origem histórica em 24 de julho de 1928, quando foi criada a Polícia das Estradas no governo do Presidente Washington Luís. A instituição foi denominada Polícia Rodoviária Federal em 1945 e, com a Constituição de 1988, consolidou-se como órgão permanente de segurança pública federal, responsável pelo patrulhamento ostensivo das rodovias federais e por ações de segurança viária, mobilidade, fiscalização e enfrentamento qualificado ao crime em mais de 75 mil quilômetros de rodovias federais.`,
      marcos: [
        '1928: criação da Polícia das Estradas, origem histórica da PRF, por ato do Presidente Washington Luís.',
        '1945: adoção da denominação Polícia Rodoviária Federal.',
        '1988: constitucionalização da PRF como órgão permanente de segurança pública no art. 144 da Constituição Federal.',
        '1995/1997/1998: Decreto nº 1.655/1995, Código de Trânsito Brasileiro e Lei nº 9.654/1998 consolidam competências, carreira e regime jurídico.',
        '2023: Decreto nº 11.759/2023 atualiza a estrutura regimental no Ministério da Justiça e Segurança Pública.',
        '2025: documento institucional PRF Rotas de Integração registra presença nos 26 estados e DF, 13 mil+ servidores ativos, 27 Superintendências, 152 Delegacias e cerca de 500 UOPs.',
        '2026: Lei nº 14.875/2024, Anexo XXVII, fixa a tabela de subsídio da carreira PRF com efeitos a partir de 01/05/2026.'
      ]
    };
  }

  if (inst === 'pmerj') {
    return {
      origem: `A ${nome} tem origem oficial em 13 de maio de 1809, com a criação da Divisão Militar da Guarda Real da Polícia da Corte. Hoje, a SEPM/PMERJ atua no policiamento ostensivo e na preservação da ordem pública no Estado do Rio de Janeiro, sob comando de Secretário de Estado que acumula o Comando-Geral da Corporação.`,
      marcos: [
        '1809: criação da Divisão Militar da Guarda Real da Polícia da Corte por D. João VI.',
        '2019: Decreto 46.600 organiza a SEPM com Subsecretaria-Geral, Gestão Administrativa, Gestão Operacional, Comando e Controle, Inteligência, Corregedoria-Geral e Estado-Maior Geral.',
        '2025: Lei 11.041/2025 readequa o efetivo legal da PMERJ para 60.445 integrantes, distribuídos entre postos e graduações.',
        'Folha GESPERJ fev/2026: 43.866 vínculos ativos na SEPM e 26.087 inativos/aposentados.',
        'Carreira militar organizada entre oficiais e praças, com postos e graduações de Coronel a Soldado, conforme hierarquia oficial.',
        '2026: Cel PM Sylvio Ricardo Ciuffo Guerra assume como Secretário de Estado de Polícia Militar e Comandante-Geral da PMERJ.'
      ]
    };
  }

  if (/Bombeiro/i.test(tipo)) {
    return {
      origem: `O ${nome} integra a segurança pública e a defesa civil do ${estadoNome}. Sua trajetória é ligada ao combate a incêndios, salvamento, resgate, prevenção, vistoria técnica e resposta a emergências, com organização militar estadual/distrital. Registro de criação/origem usado nesta base: ${criacao}.`,
      marcos: [
        'Formação ou consolidação como estrutura bombeiro militar estadual/distrital.',
        'Expansão das atividades de prevenção contra incêndio, salvamento, atendimento pré-hospitalar e defesa civil.',
        'Adoção de normas técnicas, formação especializada e integração com sistemas estaduais de gestão de riscos e desastres.'
      ]
    };
  }

  if (/Polícia Civil/i.test(tipo)) {
    return {
      origem: `A ${nome} é a polícia judiciária do ${estadoNome}. Sua história está ligada à investigação criminal, apuração de infrações penais, formalização de procedimentos, apoio à Justiça criminal e especialização de delegacias. Registro de criação/origem usado nesta base: ${criacao}.`,
      marcos: [
        'Consolidação das delegacias e da carreira policial civil como estrutura de investigação estadual/distrital.',
        'Especialização de unidades investigativas para homicídios, patrimônio, drogas, crimes cibernéticos, violência contra a mulher e outras áreas.',
        'Integração progressiva com perícia, inteligência, bancos de dados e cooperação operacional com outras forças.'
      ]
    };
  }

  if (/Polícia Penal/i.test(tipo)) {
    return {
      origem: `A ${nome} representa a carreira voltada à segurança dos estabelecimentos penais no ${estadoNome}. A Polícia Penal foi inserida no texto constitucional pela Emenda Constitucional 104/2019, e cada ente federativo organiza sua estrutura, cargos, atribuições e identidade institucional por normas próprias.`,
      marcos: [
        'Constitucionalização da Polícia Penal pela EC 104/2019.',
        'Transição de estruturas penitenciárias para carreira policial penal estadual/distrital.',
        'Fortalecimento da segurança prisional, escoltas, inteligência penitenciária e controle interno dos estabelecimentos penais.'
      ]
    };
  }

  return {
    origem: `A ${nome} é força policial militar do ${estadoNome}, com trajetória ligada à preservação da ordem pública, policiamento ostensivo, disciplina militar e proteção da sociedade. Registro de criação/origem usado nesta base: ${criacao}.`,
    marcos: [
      'Criação ou organização histórica como força pública estadual/provincial.',
      'Consolidação do policiamento ostensivo e da preservação da ordem pública como atribuições centrais.',
      'Modernização de formação, radiopatrulhamento, policiamento especializado, corregedoria, inteligência e atendimento comunitário.'
    ]
  };
}

function montarCamposResumoHistoria(inst, dados) {
  const { resumo, tipo, uf, estadoNome } = dados;
  const populacaoTitulo = resumo.populacaoTitulo || (/Polícia Penal/i.test(tipo) ? 'Presos atendidos' : 'População atendida');
  return [
    { rotulo: 'Natureza', valor: tipo },
    { rotulo: 'Jurisdição', valor: `${uf} · ${estadoNome}` },
    { rotulo: 'Criação/origem', valor: valorHistoriaOuNaoDeclarado(resumo.criacao, 'Registro histórico específico a confirmar') },
    { rotulo: 'Criador/ato de origem', valor: getCriadorInstitucional(inst, tipo, estadoNome) },
    { rotulo: 'Efetivo total', valor: valorHistoriaOuNaoDeclarado(resumo.efetivoTotalLabel || calcularEfetivoTotalResumoHeader(resumo), 'Efetivo específico a confirmar') },
    { rotulo: /Bombeiro|Polícia Militar/i.test(tipo) ? 'Reserva/reforma' : 'Aposentados/inativos', valor: valorHistoriaOuNaoDeclarado(resumo.reservaLabel || resumo.reserva, 'Inativos específicos a confirmar') },
    { rotulo: 'Mulheres no efetivo', valor: valorHistoriaOuNaoDeclarado(resumo.femininasLabel || resumo.femininas, 'Dado específico a confirmar') },
    { rotulo: populacaoTitulo, valor: valorHistoriaOuNaoDeclarado(resumo.populacaoLabel || (resumo.populacao ? formatarNumeroHeader(resumo.populacao) : ''), 'Abrangência específica a confirmar') },
    { rotulo: resumo.relacaoTitulo || 'Relação institucional', valor: valorHistoriaOuNaoDeclarado(resumo.relacaoLabel, 'Relação específica a confirmar') },
    { rotulo: /Polícia Federal|Rodoviária Federal/i.test(tipo) ? 'Direção-Geral' : (/Polícia Civil/i.test(tipo) ? 'Chefia/Direção' : 'Comando/Direção'), valor: valorHistoriaOuNaoDeclarado(resumo.comando, 'Chefia atual a confirmar') }
  ];
}


function renderizarBrasoesHistoriaDetalheEspecial(cont, inst, especial) {
  const tituloSpan = document.getElementById('txt-inst-brasoes');
  if (tituloSpan) tituloSpan.textContent = especial.sigla_publica || inst.toUpperCase();
  const lista = (itens, classe) => (Array.isArray(itens) ? itens : []).map(item => `<li>${escapeHtml(item)}</li>`).join('');
  const pares = (itens) => (Array.isArray(itens) ? itens : []).map(item => `
    <article class="brasoes-resumo-item">
      <span>${escapeHtml(item[0])}</span>
      <strong>${escapeHtml(item[1])}</strong>
    </article>
  `).join('');
  const paragrafos = (itens) => (Array.isArray(itens) ? itens : []).map(item => `<p>${escapeHtml(item)}</p>`).join('');

  cont.innerHTML = `
    <section class="brasoes-hero" aria-label="Brasão e identificação da instituição">
      <div class="brasoes-imagem-wrap">
        <img class="brasoes-imagem" src="${escapeHtml(especial.imagem || 'img/CIVIL/pcdf.webp')}" alt="Brasão ou insígnia da ${escapeHtml(especial.nome_oficial || 'PCDF')}" loading="eager" decoding="async" onerror="this.onerror=null;this.src='img/LOGO/logoleao.webp';">
      </div>
      <div class="brasoes-hero-copy">
        <span class="brasoes-kicker">${escapeHtml(especial.esfera || 'estadual')}</span>
        <h3>${escapeHtml(especial.sigla_publica || inst.toUpperCase())} — ${escapeHtml(especial.nome_oficial || '')}</h3>
        <p>${escapeHtml(especial.uf || 'DF')} · Polícia Civil</p>
        <small>${escapeHtml(especial.atualizado || 'Resumo institucional revisado')}</small>
      </div>
    </section>

    <section class="brasoes-resumo-grid" aria-label="Resumo institucional detalhado">
      ${pares(especial.indicadores)}
    </section>

    <section class="brasoes-historia-card" aria-label="História da instituição">
      <div class="brasoes-section-title">
        <span>História detalhada</span>
        <h3>Origem e evolução institucional</h3>
      </div>
      ${paragrafos(especial.historia)}
    </section>

    <section class="brasoes-historia-card" aria-label="Identidade visual e símbolos">
      <div class="brasoes-section-title">
        <span>Símbolos</span>
        <h3>Como interpretar o brasão e a bandeira</h3>
      </div>
      <div class="brasoes-resumo-grid">
        ${pares(especial.simbolos)}
      </div>
    </section>

    <section class="brasoes-historia-card" aria-label="Marcos históricos">
      <div class="brasoes-section-title">
        <span>Linha do tempo</span>
        <h3>Marcos históricos da PCDF</h3>
      </div>
      <ul class="brasoes-marcos">
        ${lista(especial.marcos)}
      </ul>
    </section>

    <section class="brasoes-historia-card" aria-label="Chefias e medalhística">
      <div class="brasoes-section-title">
        <span>Memória institucional</span>
        <h3>Chefias e condecorações</h3>
      </div>
      <div class="brasoes-resumo-grid">
        ${pares(especial.chefias)}
      </div>
      <ul class="brasoes-marcos">
        ${lista(especial.medalhas)}
      </ul>
    </section>

    <section class="brasoes-historia-card brasoes-observacao" aria-label="Fontes e observações">
      <strong>Fonte-base do resumo:</strong>
      <p>${escapeHtml(especial.fonte || 'Fontes públicas e oficiais quando disponíveis.')}</p>
      <small>Conteúdo informativo, independente e não oficial. Dados de efetivo, chefia e datas podem mudar; confirme sempre em ato oficial, portal da transparência, diário oficial ou site institucional.</small>
    </section>
  `;
}

function renderizarBrasoesHistoria() {
  const cont = document.getElementById('brasoes_historia_resultado');
  if (!cont) return;
  if (typeof instituicaoConsultaFoiSelecionada === 'function' && !instituicaoConsultaFoiSelecionada()) {
    if (typeof mostrarAvisoSelecaoInstituicao === 'function') mostrarAvisoSelecaoInstituicao('brasoes');
    return;
  }

  const inst = currInst;
  const especial = window.BRASOES_HISTORIA_DETALHES && window.BRASOES_HISTORIA_DETALHES[inst];
  if (especial) {
    renderizarBrasoesHistoriaDetalheEspecial(cont, inst, especial);
    return;
  }
  const dados = obterResumoInstituicaoCompleto(inst);
  const { sigla, nome, tipo, estadoNome, resumo } = dados;
  const imagem = imagemPrincipalBrasaoInstituicao(inst);
  const historico = getHistoricoPorTipo(inst, dados);
  const campos = montarCamposResumoHistoria(inst, dados);
  const atualizado = valorHistoriaOuNaoDeclarado(resumo.atualizado, 'Resumo institucional revisado para navegação informativa');
  const fonte = valorHistoriaOuNaoDeclarado(resumo.fonte, 'Fontes públicas e oficiais quando disponíveis; confirmar informações sensíveis nos canais oficiais da instituição.');

  const tituloSpan = document.getElementById('txt-inst-brasoes');
  if (tituloSpan) tituloSpan.textContent = sigla;

  cont.innerHTML = `
    <section class="brasoes-hero" aria-label="Brasão e identificação da instituição">
      <div class="brasoes-imagem-wrap">
        <img class="brasoes-imagem" src="${escapeHtml(imagem)}" alt="Brasão ou insígnia da ${escapeHtml(nome)}" loading="eager" decoding="async" onerror="this.onerror=null;this.src='img/LOGO/logoleao.webp';">
      </div>
      <div class="brasoes-hero-copy">
        <span class="brasoes-kicker">${escapeHtml(tipo)}</span>
        <h3>${escapeHtml(sigla)} — ${escapeHtml(nome)}</h3>
        <p>${escapeHtml(estadoNome)} · ${escapeHtml(getEsferaConsultaInstituicao(inst))}</p>
        <small>${escapeHtml(atualizado)}</small>
      </div>
    </section>

    <section class="brasoes-resumo-grid" aria-label="Resumo institucional detalhado">
      ${campos.map(campo => `
        <article class="brasoes-resumo-item">
          <span>${escapeHtml(campo.rotulo)}</span>
          <strong>${escapeHtml(campo.valor)}</strong>
        </article>
      `).join('')}
    </section>

    <section class="brasoes-historia-card" aria-label="História da instituição">
      <div class="brasoes-section-title">
        <span>História breve</span>
        <h3>Origem e evolução institucional</h3>
      </div>
      <p>${escapeHtml(historico.origem)}</p>
    </section>

    <section class="brasoes-historia-card" aria-label="Marcos históricos">
      <div class="brasoes-section-title">
        <span>Marcos históricos</span>
        <h3>Pontos importantes da trajetória</h3>
      </div>
      <ul class="brasoes-marcos">
        ${historico.marcos.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
      </ul>
    </section>

    <section class="brasoes-historia-card brasoes-observacao" aria-label="Fontes e observações">
      <strong>Fonte-base do resumo:</strong>
      <p>${escapeHtml(fonte)}</p>
      <small>Conteúdo informativo, independente e não oficial. Dados de efetivo, chefia e datas podem mudar; confirme sempre em ato oficial, portal da transparência, diário oficial ou site institucional.</small>
    </section>
  `;
}


/* ============================================================ */

// Reaplica BMBA após as rotinas globais de normalização para preservar os campos estimados e a remuneração detalhada recém-cadastrados.
if (typeof aplicarDadosEspecificosBmba === 'function') aplicarDadosEspecificosBmba();
if (typeof aplicarDadosEspecificosBmmg === 'function') aplicarDadosEspecificosBmmg();
if (typeof aplicarDadosEspecificosBmms === 'function') aplicarDadosEspecificosBmms();
if (typeof aplicarDadosEspecificosBmpr === 'function') aplicarDadosEspecificosBmpr();
if (typeof aplicarDadosEspecificosBmrj === 'function') aplicarDadosEspecificosBmrj();
