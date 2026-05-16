(function () {
  'use strict';

  const PAGE_SIZE = 14;
  const DEFAULT_INST = 'pmesp';

  const pmespRows2026 = [
    ['S2', 'Soldado 2ª Classe', 4281, 'PRAÇA • CARREIRA DE EXECUÇÃO', 'Aux. fardamento; Aux. alimentação; Adic. policial', 'Lei Compl. 1.262/15'],
    ['S1', 'Soldado 1ª Classe', 4620, 'PRAÇA • CARREIRA DE EXECUÇÃO', 'Aux. fardamento; Aux. alimentação; Adic. policial', 'Lei Compl. 1.262/15'],
    ['CB', 'Cabo', 5180, 'PRAÇA • CARREIRA DE EXECUÇÃO', 'Aux. fardamento; Adic. policial', 'Lei Compl. 1.262/15'],
    ['3S', '3º Sargento', 6470, 'GRADUADO • SUBTENENTES E SARGENTOS', 'Aux. fardamento; Adic. policial; Adic. tempo', 'Lei Compl. 1.262/15'],
    ['2S', '2º Sargento', 7220, 'GRADUADO • SUBTENENTES E SARGENTOS', 'Aux. fardamento; Adic. policial; Adic. tempo', 'Lei Compl. 1.262/15'],
    ['1S', '1º Sargento', 8120, 'GRADUADO • SUBTENENTES E SARGENTOS', 'Aux. fardamento; Adic. policial; Adic. tempo', 'Lei Compl. 1.262/15'],
    ['ST', 'Subtenente', 9180, 'GRADUADO • SUBTENENTES E SARGENTOS', 'Aux. fardamento; Adic. policial; Adic. tempo; Comissionado', 'Lei Compl. 1.262/15'],
    ['AO', 'Aspirante a Oficial', 9840, 'OFICIAL INTERMEDIÁRIO • CFO 2º ANO', 'Aux. fardamento; Adic. oficial; Aux. moradia', 'Lei Compl. 1.262/15'],
    ['2T', '2º Tenente', 11420, 'OFICIAL SUBALTERNO', 'Aux. fardamento; Adic. oficial; Aux. moradia', 'Lei Compl. 1.262/15'],
    ['1T', '1º Tenente', 13290, 'OFICIAL SUBALTERNO', 'Aux. fardamento; Adic. oficial; Aux. moradia', 'Lei Compl. 1.262/15'],
    ['CAP', 'Capitão', 18430, 'OFICIAL INTERMEDIÁRIO', 'Adic. oficial; Aux. moradia; Aux. educação', 'Lei Compl. 1.262/15'],
    ['MAJ', 'Major', 21080, 'OFICIAL SUPERIOR', 'Adic. oficial; Adic. comando; Aux. moradia', 'Lei Compl. 1.262/15'],
    ['TC', 'Tenente-Coronel', 23770, 'OFICIAL SUPERIOR', 'Adic. oficial; Adic. comando; Aux. moradia', 'Lei Compl. 1.262/15'],
    ['CEL', 'Coronel', 26918, 'OFICIAL SUPERIOR • COMANDO', 'Adic. oficial; Adic. comando; Verba representação', 'Lei Compl. 1.262/15']
  ].map(([badge, cargo, remuneracao, classe, benefDesc, criterio]) => ({
    badge,
    cargo,
    remuneracao,
    beneficios: 0,
    total: remuneracao,
    classe,
    benefDesc,
    criterio,
    fonteKey: 'pmesp',
    fonteNome: 'Tabela vigente 2026',
    fonteUrl: '#',
    valorPendente: false,
    visual2026: true
  }));

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const state = {
    inst: DEFAULT_INST,
    rows: [],
    filter: 'todos',
    sort: 'hierarquia',
    search: '',
    page: 1
  };

  const friendlyNames = {
    pf: 'Polícia Federal',
    prf: 'Polícia Rodoviária Federal',
    pcdf: 'Polícia Civil do Distrito Federal',
    pmesp: 'Polícia Militar de São Paulo',
    bmsp: 'Corpo de Bombeiros da PM de São Paulo',
    pcsp: 'Polícia Civil de São Paulo',
    ppsp: 'Polícia Penal de São Paulo',
    pmerj: 'Polícia Militar do Rio de Janeiro',
    bmrj: 'Corpo de Bombeiros Militar do Rio de Janeiro',
    pcerj: 'Polícia Civil do Rio de Janeiro',
    pprj: 'Polícia Penal do Rio de Janeiro',
    pmmg: 'Polícia Militar de Minas Gerais',
    bmmg: 'Corpo de Bombeiros Militar de Minas Gerais',
    pcmg: 'Polícia Civil de Minas Gerais',
    ppmg: 'Polícia Penal de Minas Gerais'
  };

  const ufByInst = {
    pf: 'BR', prf: 'BR', pcdf: 'DF',
    pmac: 'AC', bmac: 'AC', pcac: 'AC', ppac: 'AC',
    pmal: 'AL', bmal: 'AL', pcal: 'AL', ppal: 'AL',
    pmap: 'AP', bmap: 'AP', pcap: 'AP', ppap: 'AP',
    pmam: 'AM', bmam: 'AM', pcam: 'AM', ppam: 'AM',
    pmba: 'BA', bmba: 'BA', pcba: 'BA', ppba: 'BA',
    pcce: 'CE',
    pmes: 'ES', bmes: 'ES', pces: 'ES', ppes: 'ES',
    pmmt: 'MT', bmmt: 'MT', pcmt: 'MT', ppmt: 'MT',
    pmms: 'MS', bmms: 'MS', pcms: 'MS', ppms: 'MS',
    pmmg: 'MG', bmmg: 'MG', pcmg: 'MG', ppmg: 'MG',
    pmpr: 'PR', bmpr: 'PR', pcpr: 'PR', pppr: 'PR',
    pmrs: 'RS', pcrs: 'RS', pprs: 'RS',
    pmerj: 'RJ', bmrj: 'RJ', pcerj: 'RJ', pprj: 'RJ',
    pmsc: 'SC', bmsc: 'SC', pcsc: 'SC', ppsc: 'SC',
    pmesp: 'SP', bmsp: 'SP', pcsp: 'SP', ppsp: 'SP'
  };

  function esc(text) {
    return String(text == null ? '' : text).replace(/[&<>"']/g, char => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    }[char]));
  }

  function money(value) {
    const number = Number(value);
    if (!Number.isFinite(number) || number <= 0) return 'Dados em breve';
    return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  function normalize(text) {
    return String(text || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  function selectedOption(inst) {
    const select = $('#remu-filtro-instituicao');
    if (!select) return null;
    return Array.from(select.options).find(opt => opt.value === inst) || null;
  }

  function optionName(inst) {
    const option = selectedOption(inst);
    if (!option) return friendlyNames[inst] || String(inst || '').toUpperCase();
    const raw = option.textContent.replace(/\s+/g, ' ').trim();
    const parts = raw.split('—').map(p => p.trim());
    const sigla = parts[0] || inst.toUpperCase();
    const name = friendlyNames[inst] || parts[1] || sigla;
    const uf = ufByInst[inst];
    if (friendlyNames[inst]) return friendlyNames[inst];
    if (uf && !/Federal|Distrito Federal|São Paulo|Rio de Janeiro|Minas Gerais/i.test(name)) return `${name} — ${uf}`;
    return name;
  }

  function sigla(inst) {
    const option = selectedOption(inst);
    return (option ? option.textContent.split('—')[0].trim() : inst.toUpperCase()).replace('PMESP', 'PM SP').replace('CBPMESP', 'CB SP');
  }

  function groupOf(row) {
    const n = normalize(row.cargo);
    if (/comandante|delegado geral|diretor geral|classe especial/.test(n) || /^coronel\b/.test(n)) return 'comando';
    if (/soldado|cabo|sargento|subtenente|sub tenente|aluno|cadete|praca/.test(n)) return 'pracas';
    if (/tenente|capitao|major|oficial|delegado|perito|medico|papiloscopista|escrivao|investigador|agente/.test(n)) return 'oficiais';
    return 'todos';
  }

  function badgeText(row) {
    if (row.badge && String(row.badge).length <= 5) return esc(row.badge);
    const cargo = String(row.cargo || '').trim();
    const explicit = cargo.match(/^([A-Z]{1,4}\s?[A-Z]{0,3}|\d+[ºª]?\s?[A-Z]{0,3})\s?[—-]/);
    if (explicit && explicit[1]) return explicit[1].replace(/\s+/g, '<br>');
    const words = cargo.split(/\s+/).filter(Boolean);
    return words.slice(0, 2).map(w => w[0]).join('').toUpperCase() || '—';
  }

  function categoryLabel(row) {
    if (row.classe) return row.classe;
    const g = groupOf(row);
    if (g === 'pracas') return 'Praça · carreira de execução';
    if (g === 'oficiais') return 'Oficial / carreira superior';
    if (g === 'comando') return 'Comando / classe superior';
    return row.badge || 'Tabela oficial';
  }

  function chips(row) {
    const source = String(row.benefDesc || row.adicionais || row.criterio || '').replace(/\s+/g, ' ').trim();
    const pieces = source.split(/[.;]/).map(p => p.trim()).filter(Boolean).slice(0, 4);
    if (!pieces.length) return ['Sem adicionais fixos somados'];
    return pieces.map(piece => {
      const cleaned = piece
        .replace(/^Benefícios e indenizações não somados ao subsídio:?\s*/i, '')
        .replace(/^Benefícios não somados:?\s*/i, '')
        .replace(/^Auxílio-/i, 'Aux. ')
        .trim();
      return cleaned.length > 42 ? cleaned.slice(0, 39).trim() + '...' : cleaned;
    });
  }

  function sourceFor(row) {
    if (row.fonteNome || row.fonteUrl) return { nome: row.fonteNome || 'Tabela vigente', url: row.fonteUrl || '#' };
    const fontes = window.REMUNERACAO_FONTES_OFICIAIS || {};
    return fontes[row.fonteKey] || fontes[state.inst] || { nome: 'Fonte oficial da carreira', url: '#' };
  }

  function safeUrl(url) {
    const value = String(url || '').trim();
    return /^https?:\/\//i.test(value) ? value : '#';
  }

  function loadRows(inst) {
    if (inst === 'pmesp') return pmespRows2026.slice();
    if (typeof window.gerarRemuneracaoTabelada !== 'function') return [];
    try { return window.gerarRemuneracaoTabelada(inst) || []; }
    catch (err) { console.warn('Não foi possível carregar remuneração:', err); return []; }
  }

  function updateInstitutionUi() {
    const inst = state.inst;
    const name = optionName(inst);
    const uf = ufByInst[inst] || 'BR';
    const esfera = selectedOption(inst)?.dataset.esfera === 'federal' ? 'Federal' : 'Estadual';
    const sig = sigla(inst);

    $('#remu-title-inst').textContent = name;
    $('#remu-selected-name').textContent = name;
    $('#remu-selected-state').textContent = uf;
    $('#remu-selected-sigla').innerHTML = esc(sig).replace(/\s+/, '<br>');
    $('#remu-selected-meta').textContent = `${esfera} · tabela bruta · fonte oficial`;
    $('#remu-breadcrumb-current').textContent = `Remuneração Tabelada — ${sig.replace(/\s+/g, '-')}`;
  }

  function updateStats() {
    const rows = state.rows.filter(row => Number(row.remuneracao) > 0);
    const min = rows.reduce((acc, row) => !acc || row.remuneracao < acc.remuneracao ? row : acc, null);
    const max = rows.reduce((acc, row) => !acc || row.remuneracao > acc.remuneracao ? row : acc, null);
    $('#remu-total-cargos').textContent = String(state.rows.length || 0);
    $('#remu-total-desc').textContent = state.rows.length === 1 ? 'cargo listado' : 'cargos listados';
    $('#remu-menor-total').textContent = min ? money(min.remuneracao) : '—';
    $('#remu-menor-cargo').textContent = min ? min.cargo.replace(/\s?[—-].+$/, '') : '—';
    $('#remu-maior-total').textContent = max ? money(max.remuneracao) : '—';
    $('#remu-maior-cargo').textContent = max ? max.cargo.replace(/\s?[—-].+$/, '') : '—';
    $('#remu-criterio-resumo').textContent = state.inst === 'pmesp' ? 'Reajuste de 5,8% aplicado' : 'Valores brutos informativos';
  }

  function filteredRows(noSearch) {
    let rows = state.rows.slice();
    if (state.filter !== 'todos') rows = rows.filter(row => groupOf(row) === state.filter);
    const q = normalize(state.search);
    if (!noSearch && q) rows = rows.filter(row => normalize(`${row.cargo} ${row.badge} ${row.criterio}`).includes(q));
    if (state.sort === 'asc') rows.sort((a, b) => Number(a.remuneracao || 0) - Number(b.remuneracao || 0));
    if (state.sort === 'desc') rows.sort((a, b) => Number(b.remuneracao || 0) - Number(a.remuneracao || 0));
    return rows;
  }

  function updateFilterCounts() {
    const rows = state.rows.slice();
    const counts = {
      todos: rows.length,
      pracas: rows.filter(row => groupOf(row) === 'pracas').length,
      oficiais: rows.filter(row => groupOf(row) === 'oficiais').length,
      comando: rows.filter(row => groupOf(row) === 'comando').length
    };
    Object.entries(counts).forEach(([key, value]) => {
      const el = $(`#remu-count-${key}`);
      if (el) el.textContent = String(value);
    });
  }

  function rowHtml(row, index) {
    const group = groupOf(row);
    const fonte = sourceFor(row);
    const chipHtml = chips(row).map((chip, i) => `<span class="usp-remu-chip ${i < 2 && /aux|adic|fardamento|moradia|comando|representação/i.test(chip) ? 'is-gold' : ''}">${esc(chip)}</span>`).join('');
    const badgeClass = group === 'comando' ? 'is-command' : (group === 'oficiais' ? 'is-gold' : '');
    return `<tr>
      <td>
        <div class="usp-remu-cargo">
          <span class="usp-remu-badge ${badgeClass}">${badgeText(row)}</span>
          <div><strong>${esc(row.cargo)}</strong><small>${esc(categoryLabel(row))}</small></div>
        </div>
      </td>
      <td class="usp-remu-value"><strong>${row.valorPendente ? 'Dados em breve' : money(row.remuneracao)}</strong>${(row.visual2026 || (index > 0 && /2026|reajuste|Lei/i.test(row.criterio || ''))) ? '<small>+5,8% vs 2025</small>' : ''}</td>
      <td><div class="usp-remu-chips">${chipHtml}</div></td>
      <td class="usp-remu-source"><a href="${esc(safeUrl(fonte.url))}" target="_blank" rel="noopener noreferrer">${esc((row.criterio || fonte.nome || 'Fonte oficial').split(/[.;]/)[0].slice(0, 55))}</a><small>${esc(fonte.nome || 'Tabela vigente')}</small></td>
    </tr>`;
  }

  function renderPagination(total) {
    const host = $('#remu-paginacao');
    const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    if (!host || pages <= 1) {
      if (host) { host.hidden = true; host.innerHTML = ''; }
      return;
    }
    host.hidden = false;
    const buttons = [];
    buttons.push(`<button type="button" data-remu-page="prev" ${state.page === 1 ? 'disabled' : ''}>←</button>`);
    for (let p = 1; p <= pages; p += 1) buttons.push(`<button type="button" data-remu-page="${p}" ${p === state.page ? 'aria-current="page"' : ''}>${p}</button>`);
    buttons.push(`<button type="button" data-remu-page="next" ${state.page === pages ? 'disabled' : ''}>→</button>`);
    host.innerHTML = buttons.join('');
  }

  function renderTable() {
    const tbody = $('#lista-remuneracao');
    if (!tbody) return;
    const rows = filteredRows(false);
    const pages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
    if (state.page > pages) state.page = pages;
    const slice = rows.slice((state.page - 1) * PAGE_SIZE, state.page * PAGE_SIZE);
    if (!slice.length) {
      tbody.innerHTML = `<tr><td class="usp-remu-empty" colspan="4">Nenhum cargo encontrado para o filtro aplicado.</td></tr>`;
    } else {
      tbody.innerHTML = slice.map(rowHtml).join('');
    }
    renderPagination(rows.length);
  }

  function updateInstitutionOptions() {
    const esfera = $('#remu-filtro-esfera')?.value || '';
    const select = $('#remu-filtro-instituicao');
    if (!select) return;
    Array.from(select.options).forEach(opt => {
      if (!opt.value) { opt.hidden = false; return; }
      opt.hidden = Boolean(esfera) && opt.dataset.esfera !== esfera;
    });
    const current = selectedOption(select.value);
    if (current && current.hidden) select.value = '';
  }

  function setInst(inst) {
    const select = $('#remu-filtro-instituicao');
    const valid = inst && selectedOption(inst) ? inst : DEFAULT_INST;
    state.inst = valid;
    if (select) select.value = valid;
    const esfera = selectedOption(valid)?.dataset.esfera || '';
    const esferaSelect = $('#remu-filtro-esfera');
    if (esferaSelect) esferaSelect.value = esfera;
    updateInstitutionOptions();
    state.rows = loadRows(valid);
    state.page = 1;
    updateInstitutionUi();
    updateStats();
    updateFilterCounts();
    renderTable();
  }

  function init() {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get('inst') || $('#remu-filtro-instituicao')?.value || DEFAULT_INST;
    setInst(requested);

    $('#remu-filtro-esfera')?.addEventListener('change', () => {
      updateInstitutionOptions();
      const select = $('#remu-filtro-instituicao');
      const firstVisible = Array.from(select.options).find(opt => opt.value && !opt.hidden);
      if (firstVisible) setInst(firstVisible.value);
    });

    $('#remu-filtro-instituicao')?.addEventListener('change', event => {
      if (event.target.value) setInst(event.target.value);
    });

    $('#remu-busca-cargo')?.addEventListener('input', event => {
      state.search = event.target.value;
      state.page = 1;
      renderTable();
    });

    document.addEventListener('click', event => {
      const filterBtn = event.target.closest('[data-remu-filter]');
      if (filterBtn) {
        state.filter = filterBtn.dataset.remuFilter || 'todos';
        state.page = 1;
        $$('[data-remu-filter]').forEach(btn => btn.classList.toggle('is-active', btn === filterBtn));
        renderTable();
        return;
      }
      const sortBtn = event.target.closest('[data-remu-sort]');
      if (sortBtn) {
        state.sort = sortBtn.dataset.remuSort || 'hierarquia';
        state.page = 1;
        $$('[data-remu-sort]').forEach(btn => btn.classList.toggle('is-active', btn === sortBtn));
        renderTable();
        return;
      }
      const pageBtn = event.target.closest('[data-remu-page]');
      if (pageBtn && !pageBtn.disabled) {
        const rows = filteredRows(false);
        const pages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
        const value = pageBtn.dataset.remuPage;
        if (value === 'prev') state.page -= 1;
        else if (value === 'next') state.page += 1;
        else state.page = Number(value) || 1;
        state.page = Math.max(1, Math.min(pages, state.page));
        renderTable();
        $('.usp-remu-table-wrap')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
