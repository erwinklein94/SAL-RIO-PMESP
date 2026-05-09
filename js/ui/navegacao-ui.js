/* Módulo organizado por responsabilidade — Helpers, menu, tema, navegação e popularização de cargos.
   Mantém a ordem original para preservar compatibilidade. */

function normalizarInstituicao(inst) {
  return INSTITUICOES_VALIDAS.includes(inst) ? inst : 'pmesp';
}

function isPoliciaPenal(inst) {
  return /^pp/.test(String(inst || ''));
}

function getSiglaInstituicao(inst) {
  const info = HEADER_INSTITUICOES_INFO?.[inst];
  return info?.titulo || String(inst || '').toUpperCase();
}

function getNomeInstituicao(inst) {
  const info = HEADER_INSTITUICOES_INFO?.[inst];
  return info?.desc || 'Polícia Penal';
}

function getUnidadeInstituicao(inst) {
  const estado = getEstadoDaInstituicao(inst);
  return HEADER_ESTADOS?.[estado]?.nome || 'unidade federativa';
}

/* BLOCO 15.7 — Funções utilitárias gerais */
const fmt = v => `R$ ${(+v || 0).toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
const valEl = id => parseFloat(document.getElementById(id)?.value) || 0;
const BA_REFS = ['I', 'II', 'III', 'IV', 'V'];
const refBa = i => BA_REFS[Math.max(0, Math.min(4, parseInt(i, 10) || 0))] || 'I';
const idxRefBa = id => Math.max(0, Math.min(4, parseInt(document.getElementById(id)?.value || '0', 10) || 0));

function debounce(fn, ms = 150) {
  let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

function mostrarToast(msg, tipo = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = msg;
  toast.className = 'toast show' + (tipo === 'error' ? ' error' : '');
  window.clearTimeout(toast.__unisegToastTimer);
  toast.__unisegToastTimer = window.setTimeout(() => {
    toast.className = 'toast';
  }, 3500);
}

function escapeHtml(str = '') {
  return String(str).replace(/[&<>'"]/g, ch => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;'}[ch]));
}

/* ============================================================ */
/* === UI: MENU, TEMA, TROCA DE PÁGINA ======================== */
/* ============================================================ */
/* BLOCO 15.8 — Menu lateral, navegação por abas e tema */
function toggleMenu(forceOpen) {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('menuOverlay');
  const btn = document.querySelector('.menu-btn');
  if (!sidebar || !overlay || !btn) return;

  const shouldOpen = typeof forceOpen === 'boolean'
    ? forceOpen
    : !sidebar.classList.contains('active');

  sidebar.classList.toggle('active', shouldOpen);
  overlay.classList.toggle('active', shouldOpen);
  btn.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
}

function closeMenu() {
  toggleMenu(false);
}

function abrirPaginaInicial() {
  if (document.body?.dataset?.page && document.body.dataset.page !== 'principal') {
    window.location.href = (window.UNISEGPUB_PAGE_URLS && window.UNISEGPUB_PAGE_URLS.principal) || 'index.html';
    return;
  }
  // Volta ao mesmo estado visual da primeira entrada no portal:
  // página principal, cabeçalho institucional genérico e nenhum Estado/instituição marcado.
  aplicarHeaderInicialPortal();
  if (typeof limparConsultaInstitucionalInicial === 'function') limparConsultaInstitucionalInicial();
  switchPage('principal');
  try {
    if (window.location.hash !== '#principal') window.history.replaceState(null, '', '#principal');
  } catch (e) { /* navegação silenciosa */ }
}

function switchPage(page) {
  document.querySelectorAll('.page-section').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.sidebar-nav a').forEach(a => a.classList.remove('active'));

  const pageEl = document.getElementById('page-' + page);
  const menuEl = document.getElementById('menu-' + page);
  if (!pageEl || !menuEl) {
    const destino = window.UNISEGPUB_PAGE_URLS && window.UNISEGPUB_PAGE_URLS[page];
    if (destino) window.location.href = destino;
    return;
  }

  pageEl.classList.add('active');
  menuEl.classList.add('active');
  atualizarHeaderDesc();
  atualizarVisibilidadeResumoInstitucional(page);

  // Fecha a sidebar automaticamente após escolher uma aba, liberando a área principal da página.
  closeMenu();

  // As páginas institucionais agora exigem escolha dentro da própria aba.
  if (typeof prepararPaginaComSelecaoInstituicao === 'function' && prepararPaginaComSelecaoInstituicao(page)) {
    return;
  }

  // Atualiza dados da página alvo
  if (page === 'direitos') analisarDireitos();
  else if (page === 'concursos') carregarConcursos();
  else if (page === 'comparar') inicializarComparadorCarreiras();
  else if (page === 'poderes') inicializarPoderesDeveres();
  else if (page === 'brasoes') renderizarBrasoesHistoria();
  else if (page === 'acoes') carregarAcoes();
  else if (page === 'associacoes') carregarAssociacoes();
  else if (page === 'remuneracao') carregarRemuneracaoTabelada();
}

function atualizarVisibilidadeResumoInstitucional(page = '') {
  const painelResumo = document.querySelector('.header-facts-panel');
  const cardInstitucional = document.querySelector('.header-institution-card');
  const blocoPrincipal = document.querySelector('.header-institution-main');

  // O resumo do cabeçalho deve existir em todas as páginas:
  // começa como resumo do portal e vira resumo institucional somente quando
  // a instituição for escolhida no seletor daquela própria página.
  if (painelResumo) {
    painelResumo.hidden = false;
    painelResumo.style.display = '';
    painelResumo.setAttribute('aria-hidden', 'false');
  }

  if (cardInstitucional) cardInstitucional.classList.remove('sem-resumo-institucional');
  if (blocoPrincipal) blocoPrincipal.classList.remove('sem-resumo-institucional');
}

function getNomeAbaAtual() {
  const ativa = document.querySelector('.page-section.active');
  const page = ativa ? ativa.id.replace('page-', '') : 'principal';
  const nomes = {
    principal: 'Principal',
    acoes: 'Ações Judiciais',
    associacoes: 'Associações e Sindicatos',
    remuneracao: 'Remuneração Tabelada',
    concursos: 'Concursos',
    poderes: 'Poderes e Deveres',
    brasoes: 'Brasões e história',
    comparar: 'Comparar Carreiras',
    produtos: 'Produtos',
    direitos: 'Direitos e Vantagens',
    parceiros: 'Parceiros - Anuncie aqui!'
  };
  return nomes[page] || 'Principal';
}

function atualizarHeaderDesc(descInstituicao) {
  if (headerModoInicialPortal) {
    const el = document.getElementById('header-desc');
    if (el) el.textContent = getNomeAbaAtual() === 'Principal' ? 'Escolha uma instituição' : getNomeAbaAtual();
    return;
  }

  const descs = {
    pmesp: 'Polícia Militar do Estado de São Paulo',
    pmal: 'Polícia Militar do Estado de Alagoas',
    pcal: 'Polícia Civil do Estado de Alagoas',
    ppal: 'Polícia Penal do Estado de Alagoas',
    pcsp: 'Polícia Civil do Estado de São Paulo',
    pmerj: 'Polícia Militar do Rio de Janeiro',
    bmrj: 'Corpo de Bombeiros Militar do Estado do Rio de Janeiro',
    pcerj: 'Polícia Civil do Rio de Janeiro',
    pmmg: 'Polícia Militar de Minas Gerais',
    bmmg: 'Corpo de Bombeiros Militar de Minas Gerais',
    pcmg: 'Polícia Civil de Minas Gerais',
    pmba: 'Polícia Militar da Bahia',
    pcba: 'Polícia Civil da Bahia',
    pmpr: 'Polícia Militar do Paraná',
    bmpr: 'Corpo de Bombeiros Militar do Paraná',
    pcpr: 'Polícia Civil do Paraná',
    pmrs: 'Brigada Militar do Rio Grande do Sul',
    pcrs: 'Polícia Civil do Rio Grande do Sul',
    pmsc: 'Polícia Militar de Santa Catarina',
    bmsc: 'Corpo de Bombeiros Militar de Santa Catarina',
    pcsc: 'Polícia Civil de Santa Catarina',
    pmes: 'Polícia Militar do Espírito Santo',
    bmes: 'Corpo de Bombeiros Militar do Estado do Espírito Santo',
    pces: 'Polícia Civil do Espírito Santo',
    ppsp: 'Polícia Penal do Estado de São Paulo — PPESP/PPSP',
    pprj: 'Polícia Penal do Rio de Janeiro',
    ppmg: 'Polícia Penal de Minas Gerais',
    ppba: 'Polícia Penal da Bahia',
    pppr: 'Polícia Penal do Paraná',
    pprs: 'Polícia Penal do Rio Grande do Sul',
    ppsc: 'Polícia Penal de Santa Catarina',
    ppes: 'Polícia Penal do Espírito Santo',
    bmap: 'Corpo de Bombeiros Militar do Amapá',
    pmms: 'Polícia Militar de Mato Grosso do Sul',
    bmms: 'Corpo de Bombeiros Militar de Mato Grosso do Sul',
    pcms: 'Polícia Civil de Mato Grosso do Sul',
    ppms: 'Polícia Penal de Mato Grosso do Sul',
    pmmt: 'Polícia Militar de Mato Grosso',
    bmmt: 'Corpo de Bombeiros Militar do Estado de Mato Grosso',
    pcmt: 'Polícia Judiciária Civil de Mato Grosso',
    ppmt: 'Polícia Penal de Mato Grosso',
    prf: 'Polícia Rodoviária Federal'
  };
  const textoAba = getNomeAbaAtual();
  const desc = descInstituicao || descs[currInst] || HEADER_INSTITUICOES_INFO?.[currInst]?.desc || descs.pmesp;
  const el = document.getElementById('header-desc');
  if (el) el.textContent = textoAba;

  const info = HEADER_INSTITUICOES_INFO?.[currInst];
  const siglaAtual = document.getElementById('header-active-sigla');
  if (siglaAtual && info) siglaAtual.textContent = info.titulo;

  const nomeAtual = document.getElementById('header-active-name');
  if (nomeAtual) nomeAtual.textContent = desc;
}

function toggleTheme() {
  const html = document.documentElement;
  const tema = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', tema);
  localStorage.setItem('theme', tema);
  initTheme();
}

function initTheme() {
  const tema = document.documentElement.getAttribute('data-theme') || 'dark';
  document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
    const style = btn.dataset.toggleStyle || 'text';
    const isDark = tema === 'dark';

    if (style === 'icon') {
      btn.innerHTML = isDark
        ? '<span aria-hidden="true">☀️</span>'
        : '<span aria-hidden="true">🌙</span>';
      btn.setAttribute('aria-label', isDark ? 'Ativar tema claro' : 'Ativar tema escuro');
      btn.setAttribute('title', isDark ? 'Ativar tema claro' : 'Ativar tema escuro');
    } else {
      btn.innerHTML = isDark
        ? '<span aria-hidden="true">☀️</span> Claro'
        : '<span aria-hidden="true">🌙</span> Escuro';
      btn.setAttribute('aria-label', isDark ? 'Ativar tema claro' : 'Ativar tema escuro');
      btn.setAttribute('title', isDark ? 'Ativar tema claro' : 'Ativar tema escuro');
    }
  });
}

/* ============================================================ */
/* === POPULA CARGOS NO SELECT ================================ */
/* ============================================================ */
/* BLOCO 15.9 — Troca de instituição e popularização dos cargos */
function popularCargos(inst) {
  const map = {
    pmesp: CARGOS_PM,    pcsp: CARGOS_PC,    ppsp: CARGOS_PPSP,
    pmac: CARGOS_PMAC,   pmal: CARGOS_PMAL,   pcal: CARGOS_PCAL,   ppal: CARGOS_PPAL,   pcac: CARGOS_PCAC,   ppac: CARGOS_PPAC,
    pmerj: CARGOS_PMERJ, bmrj: CARGOS_BMRJ, pcerj: CARGOS_PCERJ, pprj: CARGOS_PPRJ,
    pmmg: CARGOS_PMMG,   bmmg: CARGOS_BMMG,   pcmg: CARGOS_PCMG,   ppmg: CARGOS_PPMG,
    pmba: CARGOS_PMBA,   pcba: CARGOS_PCBA,   ppba: CARGOS_PPBA,
    pmpr: CARGOS_PMPR,   bmpr: CARGOS_BMPR,   pcpr: CARGOS_PCPR,   pppr: CARGOS_PPPR,
    pmrs: CARGOS_PMRS,   pcrs: CARGOS_PCRS,   pprs: CARGOS_PPRS,
    pmsc: CARGOS_PMSC,   bmsc: CARGOS_BMSC,   pcsc: CARGOS_PCSC,   ppsc: CARGOS_PPSC,
    pmes: CARGOS_PMES,   bmes: CARGOS_BMES,   pces: CARGOS_PCES,   ppes: CARGOS_PPES,
    pmms: CARGOS_PMMS,   bmms: CARGOS_BMMS,   pcms: CARGOS_PCMS,   ppms: CARGOS_PPMS,
    pmmt: CARGOS_PMMT,   bmmt: CARGOS_BMMT,   pcmt: CARGOS_PCMT,   ppmt: CARGOS_PPMT,
    bmap: CARGOS_BMAP,};
  currTabela = CARGOS_ESTRUTURA_GENERICAS[inst] || map[inst] || CARGOS_PM;

  const sCargo = document.getElementById('cargo');
  const sCargoDir = document.getElementById('cargo_dir');
  if (!sCargo && !sCargoDir) return;
  if (sCargo) sCargo.innerHTML = '';
  if (sCargoDir) sCargoDir.innerHTML = '';

  currTabela.forEach(c => {
    if (sCargo) {
      const o1 = document.createElement('option');
      o1.value = c.val; o1.textContent = c.text;
      if (c.selected) o1.selected = true;
      sCargo.appendChild(o1);
    }

    if (sCargoDir) {
      const o2 = document.createElement('option');
      o2.value = c.val; o2.textContent = c.text;
      if (c.selected) o2.selected = true;
      sCargoDir.appendChild(o2);
    }
  });



}


/* ============================================================ */
