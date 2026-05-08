/* Módulo organizado por responsabilidade — Análise de direitos, vantagens e aposentadoria.
   Mantém a ordem original para preservar compatibilidade. */

/* === ANÁLISE DE DIREITOS (EXPANDIDA) ======================== */
/* ============================================================ */
/* BLOCO 15.11 — Análise de direitos e vantagens */
function analisarDireitos() {
  const cont = document.getElementById('resultados_dir');
  if (!cont) return;
  if (typeof instituicaoConsultaFoiSelecionada === 'function' && !instituicaoConsultaFoiSelecionada()) {
    if (typeof mostrarAvisoSelecaoInstituicao === 'function') mostrarAvisoSelecaoInstituicao('direitos');
    return;
  }

  const inst = currInst;
  const tempo = valEl('tempo_dir');
  const idade = valEl('idade_dir');
  const renda = valEl('renda_dir');
  const sit = document.getElementById('situacao_dir')?.value || 'ativa';
  const sexo = document.getElementById('sexo_dir')?.value || 'na';
  const ingresso = document.getElementById('ingresso_dir')?.value || '';
  const dependente = document.getElementById('dependente_dir')?.value || 'na';
  const localEspecial = document.getElementById('local_especial_dir')?.value || 'na';
  const requisitosApos = document.getElementById('requisitos_apos_dir')?.value || 'na';
  const cargoVal = document.getElementById('cargo_dir')?.value;
  const c = currTabela.find(x => x.val === cargoVal);
  if (!c) return;

  const nomesInst = {
    pmac: 'PMAC', pcac: 'PCAC', ppac: 'PPAC', pmesp: 'PMESP', pcsp: 'PCSP', ppsp: 'PPSP', pmerj: 'PMERJ', bmrj: 'CBMERJ', pcerj: 'PCERJ', pprj: 'PPRJ',
    pmmg: 'PMMG', bmmg: 'CBMMG', pcmg: 'PCMG', ppmg: 'PPMG', pmba: 'PMBA', pcba: 'PCBA', ppba: 'PPBA', pmpr: 'PMPR', bmpr: 'CBMPR', pcpr: 'PCPR', pppr: 'PPPR',
    pmrs: 'PMRS', pcrs: 'PCRS', pprs: 'PPRS', pmsc: 'PMSC', pcsc: 'PCSC', ppsc: 'PPSC',
    pmes: 'PMES', pces: 'PCES', ppes: 'PPES',
    pmms: 'PMMS', bmms: 'CBMMS', pcms: 'PCMS', ppms: 'PPMS',
    pmmt: 'PMMT', pcmt: 'PCMT', ppmt: 'PPMT', bmap: 'BMAP'
  };
  const isPM = String(inst || '').startsWith('pm');
  const isBM = String(inst || '').startsWith('bm');
  const isPC = String(inst || '').startsWith('pc');
  const isPP = isPoliciaPenal(inst);
  const dadosUfDireitos = HEADER_ESTADOS[getEstadoDaInstituicao(inst)] || {};
  const uf = dadosUfDireitos.sigla || '';
  const ingressoAntesEC103 = ingresso ? new Date(ingresso + 'T00:00:00') < new Date('2019-11-13T00:00:00') : false;

  let html = '';

  html += direitoResumo(c.text, nomesInst[inst] || getSiglaInstituicao(inst), tempo, idade, sit, sexo, ingresso, renda, dependente);

  // ===== DIREITOS GERAIS =====
  html += direitoSecao('Direitos gerais e benefícios familiares');

  if (dependente === 'sim' && renda > 0 && renda <= 1980.38) {
    html += direitoItem('Salário-Família', 'condicionado',
      'Pelos dados informados, pode haver enquadramento no salário-família: filho/equiparado até 14 anos ou inválido e remuneração dentro do limite legal. Cota 2026: <strong>R$ 67,54</strong>.',
      'Base: Portaria Interministerial MPS/MF nº 13/2026 e tabela INSS 2026. Conferir aplicação ao regime do servidor e regras do órgão.');
  } else if (dependente === 'nao' || (renda > 1980.38)) {
    html += direitoItem('Salário-Família', 'atencao',
      'Não aparece como direito provável com os dados informados. O benefício depende de dependente elegível e remuneração dentro do limite legal.',
      'Referência 2026: cota de R$ 67,54 para remuneração até R$ 1.980,38.');
  } else {
    html += direitoItem('Salário-Família', 'condicionado',
      'Pode existir somente se houver filho/equiparado até 14 anos ou inválido e remuneração dentro do limite legal. Informe dependente e remuneração para uma análise melhor.',
      'Referência 2026: cota de R$ 67,54 para remuneração até R$ 1.980,38.');
  }

  html += direitoItem('Auxílio-Funeral', 'condicionado',
    'Benefício/indenização normalmente destinado aos dependentes ou a quem comprovar despesas de funeral, conforme regra previdenciária ou estatuto próprio da instituição.',
    'Depende de requerimento, documentação, vínculo com o servidor e norma estadual específica.');

  html += direitoItem('Pensão por Morte', 'condicionado',
    'Direito dos dependentes legalmente habilitados, observadas as regras do regime próprio, sistema de proteção social militar ou previdência estadual.',
    'Depende da qualidade de dependente, documentação, cálculo previdenciário e legislação estadual aplicável.');

  html += direitoItem('Licença-Maternidade / Paternidade', 'condicionado',
    'Direito ligado ao nascimento, adoção ou guarda, com prazos definidos pela Constituição, lei estadual, estatuto e regulamento próprio da carreira.',
    'Evitar tratar prazo único como regra universal: a aplicação concreta depende do ente federativo e do regime jurídico.');

  html += direitoItem('Licença para Tratamento de Pessoa da Família', 'requerimento',
    'Possibilidade de afastamento para cuidar de familiar, normalmente condicionada a requerimento, comprovação do vínculo, necessidade de acompanhamento e avaliação administrativa/pericial.',
    'A remuneração, prazo e renovação variam conforme estatuto/regulamento da instituição.');

  // ===== SAÚDE E ASSISTÊNCIA =====
  html += direitoSecao('Saúde, assistência e proteção social');
  html += direitoItem('Assistência à Saúde / Plano Institucional', 'condicionado', getSaudeTexto(inst), getSaudeBase(inst));

  if (sit === 'reforma') {
    html += direitoItem('Reforma / Invalidez', 'requerimento',
      'A reforma ou aposentadoria por incapacidade exige procedimento administrativo e/ou perícia oficial. Em casos ligados ao serviço, pode haver tratamento jurídico e cálculo diferenciados.',
      'Depende de laudo, nexo com o serviço, junta médica e legislação estadual.');
  } else {
    html += direitoItem('Licença-Saúde e Readaptação', 'requerimento',
      'Em caso de doença, acidente ou limitação funcional, pode haver licença para tratamento de saúde, readaptação, restrição temporária ou avaliação de incapacidade.',
      'Depende de perícia médica oficial e procedimento administrativo.');
  }

  if (inst === 'pmesp') {
    html += direitoItem('SPSM / CBPM / Cruz Azul', 'condicionado',
      'Sistema de proteção social e assistência ligado ao militar paulista, com possíveis benefícios como pensão, auxílio-funeral, assistência e serviços vinculados.',
      'Acesso, contribuição, dependentes e coberturas dependem das normas da PMESP/CBPM/Cruz Azul.');
  } else if (inst === 'bmms') {
    html += direitoItem('SPSM/MS / AGEPREV-MS', 'condicionado',
      'Proteção social dos militares estaduais de MS e assistência conforme vínculo, contribuição, dependentes, situação funcional e norma vigente.',
      'Base: LC MS nº 127/2008, LC MS nº 291/2021, estatuto militar estadual, AGEPREV/MS e normas do CBMMS.');
  } else if (inst === 'bmpr') {
    html += direitoItem('FASPM / ParanáPrevidência', 'FASPM é assistência à saúde facultativa para policiais e bombeiros militares do Paraná; contribuição militar e proteção social devem ser conferidas no ParanáPrevidência e no contracheque.');
  } else if (inst === 'pmmg' || inst === 'bmmg') {
    html += direitoItem('IPSM Minas Gerais', 'condicionado',
      'O IPSM é referência para previdência e saúde dos militares mineiros e seus dependentes, conforme regras próprias.',
      'Base institucional: IPSM/MG. Verificar contribuição, dependentes, rede e cobertura.');
  } else if (inst === 'pcmg') {
    html += direitoItem('IPSEMG / Assistência à Saúde', 'condicionado',
      'Servidores civis mineiros podem ter acesso a assistência conforme adesão, contribuição e regras do sistema estadual.',
      'Verificar adesão, descontos, dependentes e cobertura vigente.');
  } else if (inst === 'pmba' || inst === 'pcba') {
    html += direitoItem('Planserv Bahia', 'condicionado',
      'Assistência à saúde dos servidores públicos baianos, sujeita a adesão, contribuição, dependentes e regras administrativas.',
      'Base: normas do Planserv e legislação estadual da Bahia.');
  } else if (inst === 'pmrs' || inst === 'pcrs') {
    html += direitoItem('Assistência à saúde / sistema estadual RS', 'condicionado',
      getSaudeTexto(inst),
      getSaudeBase(inst));
  } else if (inst === 'pmsc' || inst === 'pcsc') {
    html += direitoItem('Assistência à saúde / sistema estadual SC', 'condicionado',
      getSaudeTexto(inst),
      getSaudeBase(inst));
  } else if (inst === 'pmes' || inst === 'pces') {
    html += direitoItem('Assistência à saúde / sistema estadual ES', 'condicionado',
      getSaudeTexto(inst),
      getSaudeBase(inst));
  } else if (isPP) {
    html += direitoItem('Assistência à saúde / sistema penitenciário', 'condicionado',
      getSaudeTexto(inst),
      getSaudeBase(inst));
  }

  // ===== VANTAGENS REMUNERATÓRIAS =====
  html += direitoSecao('Vantagens remuneratórias e adicionais');

  if (tempo >= 5) {
    html += direitoItem('Adicional por Tempo de Serviço', 'automatico', getTempoServicoTexto(inst, tempo), getTempoServicoBase(inst));
  } else {
    const faltaTempo = Math.max(0, 5 - tempo);
    html += direitoItem('Adicional por Tempo de Serviço', 'atencao',
      `Ainda não há indicativo de primeiro período completo de tempo de serviço. Faltam aproximadamente <strong>${faltaTempo}</strong> ano(s) para o primeiro marco de 5 anos, quando aplicável.`,
      getTempoServicoBase(inst));
  }

  if (inst === 'pmesp' || inst === 'pcsp') {
    if (tempo >= 20) {
      html += direitoItem('Sexta-Parte', 'automatico',
        'Com 20 anos ou mais de efetivo exercício, há indicativo de direito à sexta-parte dos vencimentos integrais, observadas as regras constitucionais e exceções legais.',
        'Base: Art. 129 da Constituição do Estado de São Paulo; atenção à exceção para servidores remunerados por subsídio, quando aplicável.');
    } else {
      html += direitoItem('Sexta-Parte', 'atencao',
        `Ainda não há 20 anos informados. Faltam aproximadamente <strong>${20 - tempo}</strong> ano(s) para o marco temporal da sexta-parte em SP.`,
        'Base: Art. 129 da Constituição do Estado de São Paulo.');
    }
  }

  if (tempo >= 5) {
    html += direitoItem('Licença-Prêmio / Férias-Prêmio / Licença Especial', 'condicionado',
      'Pode existir direito relacionado a períodos aquisitivos por tempo de serviço, conforme a regra estadual e a situação funcional do servidor.',
      'Não tratar como automático universal: nomenclatura, concessão, conversão em pecúnia e restrições variam por Estado e carreira.');
  }

  html += direitoItem('Insalubridade', 'condicionado', getInsalubridadeTexto(inst), getInsalubridadeBase(inst));
  html += direitoItem('Periculosidade / Atividade de Risco', inst === 'pcerj' ? 'automatico' : 'condicionado', getPericulosidadeTexto(inst), getPericulosidadeBase(inst));

  if (localEspecial === 'sim') {
    html += direitoItem('Localidade Especial / Unidade Especial', 'condicionado',
      'Você informou atuação em localidade ou unidade especial. Pode haver verba, gratificação, diária, adicional ou prioridade administrativa conforme norma da instituição.',
      'Depende de designação formal, publicação, unidade, escala, disponibilidade e legislação local.');
  } else {
    html += direitoItem('Localidade Especial / Unidade Especial', 'verificar',
      'Algumas instituições possuem verbas ou regras específicas para local de difícil provimento, unidade especial, transferência ou serviço extraordinário.',
      'Marque “sim” se o servidor atua nessas condições e confirme a norma da instituição.');
  }

  html += getVantagensEspecificas(inst);

  // ===== LICENÇAS E CARREIRA =====
  html += direitoSecao('Licenças, carreira e estabilidade');
  if (tempo >= 3) {
    html += direitoItem('Estabilidade no Serviço Público', 'automatico',
      'Com 3 anos ou mais informados, há indicativo de estabilidade, desde que o estágio probatório tenha sido cumprido e aprovado.',
      'Base geral: Art. 41 da Constituição Federal. Militares e carreiras específicas podem ter rito próprio de avaliação e permanência.');
  } else {
    html += direitoItem('Estabilidade no Serviço Público', 'atencao',
      `Tempo informado inferior a 3 anos. Faltam aproximadamente <strong>${3 - tempo}</strong> ano(s) para o marco geral de estabilidade, se aprovado no estágio probatório.`,
      'Base geral: Art. 41 da Constituição Federal.');
  }

  html += direitoItem('Promoção por Bravura / Ato de Bravura', 'condicionado',
    'Não é vantagem automática. Pode ocorrer em casos excepcionais de ato reconhecido formalmente como bravura, conforme regulamento de promoções da instituição.',
    'Depende de sindicância/procedimento, enquadramento, proposta, decisão administrativa e publicação oficial.');

  html += direitoItem('Progressão / Promoção na Carreira', 'condicionado',
    'Promoções e progressões dependem de tempo, merecimento, antiguidade, avaliação, cursos, vagas, interstício, conduta e regras próprias da carreira.',
    'Verificar estatuto, plano de carreira e editais internos da instituição.');

  // ===== APOSENTADORIA / RESERVA / REFORMA =====
  html += direitoSecao((isPM || isBM) ? 'Reserva, reforma e proteção previdenciária' : 'Aposentadoria, abono e proteção previdenciária');

  html += direitoItem((isPM || isBM) ? 'Reserva Remunerada / Inatividade' : 'Aposentadoria Policial', getStatusAposentadoria(tempo, idade, requisitosApos),
    getAposentadoriaTexto(inst, tempo, idade, sexo, requisitosApos, ingressoAntesEC103),
    'A regra concreta depende de idade, tempo total, tempo no cargo/carreira, sexo, data de ingresso, legislação estadual e regras de transição após a EC 103/2019.');

  if (sit === 'ativa') {
    if (requisitosApos === 'sim') {
      html += direitoItem('Abono de Permanência', 'condicionado',
        'Como você informou já ter cumprido requisitos de aposentadoria/reserva e permanece em atividade, pode haver direito ao abono de permanência conforme regra previdenciária aplicável.',
        'Depende de requerimento, reconhecimento administrativo dos requisitos e norma estadual.');
    } else {
      html += direitoItem('Abono de Permanência', 'verificar',
        'Só deve ser tratado como possível depois de confirmado o cumprimento dos requisitos para aposentadoria/reserva com permanência em atividade.',
        'Não depende apenas de tempo informado: exige análise de idade, ingresso, carreira, contribuição e regra de transição.');
    }
  }

  if (isPC && (sit === 'reserva' || sit === 'reforma')) {
    html += direitoItem('Paridade e Integralidade', ingressoAntesEC103 ? 'condicionado' : 'verificar',
      ingressoAntesEC103
        ? 'A data de ingresso informada é anterior à EC 103/2019, o que pode indicar análise de integralidade/paridade conforme regras de transição e jurisprudência aplicável aos policiais civis.'
        : 'A análise de paridade e integralidade depende principalmente da data de ingresso, regra de aposentadoria utilizada e legislação do Estado. Informe/verifique a data de ingresso.',
      'Tema sensível: confirmar com setor previdenciário, associação ou advogado especializado.');
  }

  if (sit === 'reserva' || sit === 'reforma') {
    html += direitoItem('Porte de Arma na Inatividade', 'condicionado',
      'Pode existir autorização para porte na inatividade, mas não deve ser tratado como “vitalício” sem ressalvas. Normalmente depende de requisitos legais, aptidão psicológica, documentação e regras de controle.',
      'Base geral: Estatuto do Desarmamento e regulamentos. Conferir norma institucional e exigências vigentes.');
  }

  // ===== ALERTAS E FONTES =====
  html += direitoSecao('Alertas e fontes de conferência');
  html += direitoItem('Conferência em fonte oficial', 'verificar',
    'Use esta aba como triagem inicial. Para decisão financeira, ação judicial, aposentadoria, abono ou requerimento administrativo, confira sempre a legislação atualizada e a ficha funcional do servidor.',
    'Fontes úteis: Diário Oficial do Estado, estatuto da carreira, lei orgânica, portal de transparência, setor de pessoal, previdência estadual e associação/sindicato.');

  cont.innerHTML = html;
}

function direitoHtmlSeguro(valor = '') {
  const escapado = typeof escapeHtml === 'function'
    ? escapeHtml(valor)
    : String(valor ?? '').replace(/[&<>'"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[ch]));
  return escapado.replace(/&lt;(\/?)strong&gt;/g, '<$1strong>');
}

function direitoResumo(cargo, instNome, tempo, idade, sit, sexo, ingresso, renda, dependente) {
  const sitTxt = sit === 'ativa' ? 'Serviço ativo' : sit === 'reserva' ? 'Inatividade / aposentadoria' : 'Reforma / invalidez';
  const sexoTxt = sexo === 'masculino' ? 'masculino' : sexo === 'feminino' ? 'feminino' : 'não informado';
  const ingressoTxt = ingresso ? ingresso.split('-').reverse().join('/') : 'não informado';
  const rendaTxt = renda > 0 ? fmt(renda) : 'não informada';
  const depTxt = dependente === 'sim' ? 'sim' : dependente === 'nao' ? 'não' : 'não informado';
  return `<div class="direito-item acao" style="border-left-color: var(--vermelho);">
    <span class="direito-nome">Resumo da análise — ${direitoHtmlSeguro(instNome)}</span>
    <span class="direito-desc"><strong>Cargo/nível:</strong> ${direitoHtmlSeguro(cargo)}</span>
    <span class="direito-desc"><strong>Situação:</strong> ${direitoHtmlSeguro(sitTxt)} · <strong>Tempo informado:</strong> ${direitoHtmlSeguro(tempo)} ano(s) · <strong>Idade:</strong> ${direitoHtmlSeguro(idade || 'não informada')} · <strong>Sexo:</strong> ${direitoHtmlSeguro(sexoTxt)}</span>
    <span class="direito-desc"><strong>Ingresso:</strong> ${direitoHtmlSeguro(ingressoTxt)} · <strong>Remuneração bruta:</strong> ${direitoHtmlSeguro(rendaTxt)} · <strong>Dependente para salário-família:</strong> ${direitoHtmlSeguro(depTxt)}</span>
  </div>`;
}

function direitoSecao(titulo) {
  return `<div class="direitos-section-title">${direitoHtmlSeguro(titulo)}</div>`;
}

function direitoItem(nome, status, desc, base = '') {
  const statusMap = {
    automatico: { label: '✓ Direito automático / requisito provável', color: 'var(--verde)', bg: 'rgba(32, 142, 78, 0.06)' },
    condicionado: { label: '◼ Direito condicionado', color: 'var(--dourado)', bg: 'rgba(223,182,62,0.08)' },
    requerimento: { label: '⏳ Depende de requerimento/perícia', color: 'var(--azul)', bg: 'rgba(30,48,132,0.08)' },
    verificar: { label: '⚠ Verificar caso individual', color: 'var(--text-muted)', bg: 'var(--item-bg)' },
    atencao: { label: '⚠ Atenção / requisito não indicado', color: '#e60000', bg: 'rgba(230, 0, 0, 0.05)' }
  };
  const cfg = statusMap[status] || statusMap.verificar;
  const baseHtml = base ? `<span class="direito-meta"><strong>Base/observação:</strong> ${direitoHtmlSeguro(base)}</span>` : '';
  const classe = status === 'automatico' ? 'sim' : status === 'atencao' ? 'nao' : '';
  return `<div class="direito-item ${classe}" style="border-left-color:${cfg.color}; background:${cfg.bg};">
    <span class="direito-nome">${direitoHtmlSeguro(nome)}</span>
    <span class="direito-status" style="color:${cfg.color};">${direitoHtmlSeguro(cfg.label)}</span>
    <span class="direito-desc">${direitoHtmlSeguro(desc)}</span>
    ${baseHtml}
  </div>`;
}

function getSaudeTexto(inst) {
  if (isPoliciaPenal(inst)) {
    const info = getInfoPoliciaPenal(inst);
    return `${info.sigla}: ${info.saude} Não confundir assistência à saúde com adicional, indenização ou verba remuneratória.`;
  }
  const textos = {
    pmac: 'PMAC: assistência à saúde e proteção social devem ser conferidas na PMAC, SEAD/AC, Acreprevidência e normas estaduais; benefício, cobertura e dependentes variam por vínculo, contribuição e ato funcional.',
    pcac: 'PCAC: assistência à saúde deve ser conferida na PCAC, SEAD/AC, Acreprevidência e normas estaduais; pode envolver perícia oficial, regras do servidor estadual e normas próprias da carreira.',
    bmap: 'BMAP/CBMAP: assistência, saúde, junta médica e proteção social devem ser conferidas no CBMAP, SEAD/AP, AMPRev e normas estaduais; cobertura, dependentes e descontos variam por vínculo e ato funcional.',
    pmesp: 'PMESP: assistência pode envolver Cruz Azul, FUSAM, CBPM/SPSM e regras próprias para titular e dependentes; a contribuição deve ser conferida na CBPM conforme vínculo, retribuição-base, pensão e dependentes.',
    pcsp: 'PCSP: pode haver IAMSPE, auxílio-alimentação, DEJEC, insalubridade, quinquênios, sexta-parte e outras rubricas conforme vínculo, dias trabalhados, escala, laudo, contribuição e regras do Estado.',
    pmerj: 'PMERJ: assistência pode envolver FUSPOM, HCPM, Família Azul, Diretoria de Assistência Social, Diretoria Geral de Odontologia e regras próprias da SEPM/PMERJ.',
    bmrj: 'CBMERJ: assistência, saúde operacional, juntas médicas, proteção social militar/SPSMERJ e regras da SEDEC/CBMERJ devem ser conferidas por vínculo, contribuição, dependentes e contracheque.',
    bmms: 'CBMMS: proteção social dos militares estaduais de MS, AGEPREV/MS, assistência institucional e regras de saúde devem ser conferidas por vínculo, contribuição, dependentes e contracheque.',
    pcerj: 'PCERJ: verificar assistência disponível, convênios e regras administrativas da Polícia Civil/RJ.',
    pmmg: 'PMMG: assistência e previdência vinculadas ao IPSM, conforme contribuição, dependentes e rede credenciada.',
    bmmg: 'CBMMG: assistência e previdência vinculadas ao IPSM, conforme contribuição, dependentes, rede credenciada e situação funcional.',
    pcmg: 'PCMG: assistência pode envolver IPSEMG ou outro plano, conforme adesão e regra estadual.',
    pmba: 'PMBA: assistência pode envolver Planserv e regras estaduais de adesão, contribuição e cobertura.',
    pcba: 'PCBA: assistência pode envolver Planserv e regras estaduais de adesão, contribuição e cobertura.',
    pmpr: 'PMPR: assistência pode envolver FASPM, sistema próprio de saúde militar e regras de adesão/dependentes.',
    bmpr: 'CBMPR: FASPM facultativo, ParanáPrevidência/proteção social militar, atendimento de saúde e regras de dependentes devem ser conferidos por vínculo, contribuição e contracheque.',
    pcpr: 'PCPR: assistência pode envolver o Sistema de Assistência à Saúde do Paraná e regras administrativas do Estado.',
    pmrs: 'PMRS: assistência pode envolver IPE Saúde, Hospital da Brigada Militar e regras próprias dos militares estaduais do RS.',
    pcrs: 'PCRS: assistência pode envolver IPE Saúde e regras administrativas do Estado do Rio Grande do Sul.',
    pmsc: 'PMSC: assistência pode envolver SC Saúde, IPREV/SC e regras próprias do sistema dos militares estaduais de Santa Catarina.',
    pcsc: 'PCSC: assistência pode envolver SC Saúde/IPREV-SC e regras administrativas do Estado de Santa Catarina.',
    pmes: 'PMES: assistência pode envolver IPAJM/ES, assistência médica/odontológica prevista em edital e normas próprias dos militares estaduais do Espírito Santo.',
    pces: 'PCES: assistência pode envolver IPAJM/ES, regras administrativas do Estado do Espírito Santo e normas da carreira policial civil.',
    prf: 'PRF: assistência à saúde do servidor federal deve ser conferida no SouGov/SIAPE/MGI, especialmente auxílio-saúde suplementar por faixa, dependentes e regras vigentes. Não tratar assistência como adicional remuneratório automático.'
  };
  return textos[inst] || 'Verificar assistência à saúde conforme norma da instituição.';
}

function getSaudeBase(inst) {
  if (isPoliciaPenal(inst)) {
    const info = getInfoPoliciaPenal(inst);
    return `Base: ${info.orgao}; ${info.previdencia}`;
  }
  if (inst === 'prf') return 'Base: Lei nº 8.112/1990, normas SIAPE/SouGov/MGI e regras federais de assistência à saúde suplementar; conferir cadastro, faixa, dependentes e comprovantes.';
  if (inst === 'bmap') return 'Base: CBMAP, SEAD/AP, AMPRev, LC AP 113/2018, LC AP 173/2025, estatuto militar estadual e normas administrativas. Conferir contribuição, dependentes, perícia, reserva/reforma e cobertura vigente.';
  if (inst === 'pmac' || inst === 'pcac') return 'Base: PMAC/PCAC, SEAD/AC, Acreprevidência, estatutos e normas estaduais. Conferir adesão, contribuição, dependentes, perícia e cobertura vigente.';
  if (inst === 'bmrj') return 'Base: SEDEC/CBMERJ, Lei RJ 9.537/2021, normas do SPSMERJ, assistência médica estadual e regras administrativas de dependentes/contribuição.';
  if (inst === 'bmms') return 'Base: LC MS nº 127/2008, LC MS nº 291/2021, Estatuto dos Militares Estaduais de MS, AGEPREV/MS, normas do CBMMS e contracheque.';
  if (inst === 'pmmg' || inst === 'bmmg') return 'IPSM/MG: gestão de benefícios previdenciários e de saúde dos militares mineiros e dependentes; conferir contribuição, dependentes, rede e regras assistenciais.';
  if (inst === 'pmba' || inst === 'pcba') return 'Planserv/BA e legislação estadual aplicável.';
  if (inst === 'bmpr') return 'FASPM/PR: Lei PR 17.169/2012; ParanáPrevidência/proteção social militar: Lei Federal 13.954/2019 e normas estaduais aplicáveis.';
  if (inst === 'bmpr') return 'CBMPR/PR: conferir Código da PMPR aplicado ao CBMPR, leis de promoção, Lei PR 22.187/2024, Lei PR 22.916/2025, boletins, classe, posto/graduação e ficha funcional.';
  if (inst === 'pmpr') return 'FASPM/PR: contribuição facultativa de saúde dos militares estaduais, conforme Lei PR 17.169/2012.';
  if (inst === 'pcpr') return 'SAS/Paraná, legislação estadual e normas internas da PCPR/SEAP, conforme vínculo e adesão.';
  if (inst === 'pmrs' || inst === 'pcrs') return 'IPE Saúde/RS, Hospital da Brigada Militar quando aplicável, normas estaduais e regras de adesão/dependentes.';
  if (inst === 'pmsc' || inst === 'pcsc') return 'SC Saúde, IPREV/SC, normas estaduais e regras de adesão/dependentes conforme cargo e situação funcional.';
  if (inst === 'pmes' || inst === 'pces') return 'IPAJM/ES, legislação estadual do Espírito Santo, normas de adesão/dependentes e regras administrativas da instituição.';
  return 'Regulamento institucional, estatuto da carreira, órgão de saúde estadual e regras de contribuição/dependentes.';
}

function getTempoServicoTexto(inst, tempo) {
  if (isPoliciaPenal(inst)) {
    const info = getInfoPoliciaPenal(inst);
    return `${info.sigla}: ${info.quadro} O tempo informado indica <strong>${tempo}</strong> ano(s) para análise de interstício, progressão, promoção, aposentadoria e vantagens condicionadas.`;
  }
  if (inst === 'prf') return `Na PRF, o tempo informado indica <strong>${tempo}</strong> ano(s) para análise de progressão/promoção, classe/padrão, aposentadoria policial, abono de permanência e indenizações condicionadas. Não aplicar quinquênio ou sexta-parte estadual à carreira federal por subsídio.`;
  if (inst === 'bmap') return `No BMAP/CBMAP, o tempo informado indica <strong>${tempo}</strong> ano(s) para análise de promoção, progressão horizontal, reserva/reforma, licença especial e vantagens condicionadas. Use a LC AP 113/2018, LC AP 173/2025, ficha funcional, boletins e contracheque.`;
  if (inst === 'pmac') return `Na PMAC, o tempo de serviço deve ser conferido para adicional temporal, sexta-parte quando aplicável, promoções, reserva/reforma e vantagens pessoais. Pelo tempo informado, há <strong>${Math.floor(tempo / 5)}</strong> período(s) de 5 anos como referência inicial.`;
  if (inst === 'pcac') return `Na PCAC, o tempo de serviço deve ser conferido para adicional temporal, progressão por classe, titulação, aposentadoria policial e vantagens pessoais. Pelo tempo informado, há <strong>${Math.floor(tempo / 5)}</strong> período(s) de 5 anos como referência inicial.`;
  if (inst === 'pmesp' || inst === 'pcsp') return `Em SP, há indicativo de <strong>${Math.floor(tempo / 5)}</strong> quinquênio(s), calculados em regra a cada 5 anos de efetivo exercício, observadas as exceções legais.`;
  if (inst === 'bmms') return `No CBMMS, a carreira usa subsídio por posto/graduação e nível. O tempo informado indica <strong>${tempo}</strong> ano(s) para conferir promoção, interstício, nível, reserva/reforma, licença especial e enquadramento no contracheque.`;
  if (inst === 'bmrj') return `No CBMERJ, o triênio/ATS incide sobre soldo + GHP + GRET + GRAM para quem preservou o direito. Pelo tempo informado, há <strong>${Math.floor(tempo / 3)}</strong> período(s) de 3 anos como referência; para ingresso por edital publicado a partir de 01/01/2022, a LC RJ 194/2021 extinguiu o adicional.`;
  if (inst === 'pmerj') return `Na PMERJ, o triênio/ATS incide sobre soldo + GHP + GRET + GRAM para quem preservou o direito. Pelo tempo informado, há <strong>${Math.floor(tempo / 3)}</strong> período(s) de 3 anos como referência; para ingresso por edital publicado a partir de 01/01/2022, a LC RJ 194/2021 extinguiu o adicional.`;
  if (inst === 'pcerj') return `Na PCERJ, a Lei Orgânica vigente prevê adicional por tempo de serviço. Pelo tempo informado, há <strong>${Math.floor(tempo / 5)}</strong> período(s) de 5 anos como referência.`;
  if (inst === 'bmpr') return `No CBMPR, a referência principal é subsídio por classe, promoção e enquadramento na carreira. Pelo tempo informado, há <strong>${Math.floor(tempo / 5)}</strong> período(s) de 5 anos apenas como referência de conferência; não aplicar quinquênio automaticamente sem base específica.`;
  if (inst === 'pmmg' || inst === 'bmmg' || inst === 'pcmg') return `Em MG, tratar o adicional por tempo de serviço com cautela: pode envolver quinquênio, ADE, VPNI ou regra de transição. Pelo tempo informado, há <strong>${Math.floor(tempo / 5)}</strong> período(s) de 5 anos como referência para conferência.`;
  if (inst === 'pmba' || inst === 'pcba') return `Na Bahia, há referência a anuênios/adicionais por tempo conforme carreira. Pelo tempo informado, a referência inicial é de <strong>${Math.min(35, tempo)}</strong> ano(s) de serviço.`;
  if (inst === 'bmpr') return 'FASPM/PR: Lei PR 17.169/2012; ParanáPrevidência/proteção social militar: Lei Federal 13.954/2019 e normas estaduais aplicáveis.';
  if (inst === 'bmpr') return 'CBMPR/PR: conferir Código da PMPR aplicado ao CBMPR, leis de promoção, Lei PR 22.187/2024, Lei PR 22.916/2025, boletins, classe, posto/graduação e ficha funcional.';
  if (inst === 'pmpr') return `Na PMPR, a carreira é estruturada por subsídio, posto/graduação e classes. A progressão/promoção por classe deve ser conferida no enquadramento funcional; o tempo informado indica <strong>${tempo}</strong> ano(s) para análise de interstício.`;
  if (inst === 'pcpr') return `Na PCPR, a carreira é estruturada por subsídio, cargo e níveis/classes. O tempo informado indica <strong>${tempo}</strong> ano(s) para análise de promoção, progressão e regras de titulação.`;
  if (inst === 'pmrs') return `Na PMRS, posto/graduação, promoções, interstícios e eventuais vantagens devem ser conferidos conforme estatuto e ficha funcional. O tempo informado indica <strong>${tempo}</strong> ano(s) para análise.`;
  if (inst === 'pcrs') return `Na PCRS, cargo, classe, tempo de carreira e regras de promoção/progressão devem ser conferidos na ficha funcional. O tempo informado indica <strong>${tempo}</strong> ano(s) para análise.`;
  if (inst === 'pmsc') return `Na PMSC, posto/graduação, promoções, interstícios e eventuais vantagens devem ser conferidos conforme estatuto, LC SC 801/2022, LC SC 880/2025 e ficha funcional. O tempo informado indica <strong>${tempo}</strong> ano(s) para análise.`;
  if (inst === 'pcsc') return `Na PCSC, cargo, classe, tempo de carreira e regras de promoção/progressão devem ser conferidos no estatuto e na ficha funcional. O tempo informado indica <strong>${tempo}</strong> ano(s) para análise.`;
  if (inst === 'pmes') return `Na PMES, posto/graduação, referência, progressão horizontal, promoções e eventuais vantagens devem ser conferidos conforme estatuto, LC ES 420/2007, ficha funcional e atos da corporação. O tempo informado indica <strong>${tempo}</strong> ano(s) para análise.`;
  if (inst === 'pces') return `Na PCES, cargo, categoria, referências, progressões e promoções devem ser conferidos na ficha funcional e na lei da carreira. O tempo informado indica <strong>${tempo}</strong> ano(s) para análise.`;
  return 'Verificar adicional por tempo de serviço conforme legislação da carreira.';
}

function getTempoServicoBase(inst) {
  if (isPoliciaPenal(inst)) {
    const info = getInfoPoliciaPenal(inst);
    return `Base: ${info.criacao}; ${info.fonte}; ficha funcional e tabela remuneratória vigente.`;
  }
  if (inst === 'prf') return 'Base: Lei nº 9.654/1998, Lei nº 12.775/2012, Decreto nº 8.282/2014, Lei nº 14.875/2024 e ficha funcional/SouGov.';
  if (inst === 'pmac') return 'Base: Lei Complementar AC 39/1993, Lei Complementar AC 164/2006, tabelas salariais PMAC/CBMAC, ficha funcional e contracheque.';
  if (inst === 'pcac') return 'Base: Lei AC 2.250/2009, Lei AC 3.228/2017, LC AC 303/2015, Lei AC 3.107/2015, tabelas salariais PCAC, ficha funcional e contracheque.';
  if (inst === 'pmesp' || inst === 'pcsp') return 'Base: Art. 129 da Constituição do Estado de São Paulo; observar exceções para remuneração por subsídio.';
  if (inst === 'pcerj') return 'Base: Lei Orgânica/Reestruturação da Polícia Civil do RJ e normas complementares.';
  if (inst === 'bmms') return 'Base: LC MS nº 127/2008, LC MS nº 188/2014, LC MS nº 291/2021, LC MS nº 354/2025, Lei MS nº 6.562/2026, boletins, ficha funcional e contracheque.';
  if (inst === 'bmpr') return `No CBMPR, a referência principal é subsídio por classe, promoção e enquadramento na carreira. Pelo tempo informado, há <strong>${Math.floor(tempo / 5)}</strong> período(s) de 5 anos apenas como referência de conferência; não aplicar quinquênio automaticamente sem base específica.`;
  if (inst === 'pmmg' || inst === 'bmmg' || inst === 'pcmg') return 'Revisar no estatuto/plano de carreira atualizado e no demonstrativo de pagamento. Não fixar percentual sem conferência individual.';
  if (inst === 'pmba' || inst === 'pcba') return 'Base: estatuto/lei orgânica e normas remuneratórias do Estado da Bahia.';
  if (inst === 'bmpr') return 'FASPM/PR: Lei PR 17.169/2012; ParanáPrevidência/proteção social militar: Lei Federal 13.954/2019 e normas estaduais aplicáveis.';
  if (inst === 'bmpr') return 'CBMPR/PR: conferir Código da PMPR aplicado ao CBMPR, leis de promoção, Lei PR 22.187/2024, Lei PR 22.916/2025, boletins, classe, posto/graduação e ficha funcional.';
  if (inst === 'pmpr') return 'Base: Lei PR 22.187/2024 e Lei PR 17.169/2012, com enquadramento por classes.';
  if (inst === 'pcpr') return 'Base: Lei Complementar PR 259/2023 e alterações posteriores, com estrutura por subsídio e níveis/classes.';
  if (inst === 'pmrs') return 'Base: estatuto dos militares estaduais do RS, normas remuneratórias e ficha funcional.';
  if (inst === 'pcrs') return 'Base: Lei Estadual RS 12.350/2005, Lei Federal 14.735/2023, normas estaduais e ficha funcional.';
  if (inst === 'pmsc') return 'Base: estatuto dos militares estaduais de SC, LC SC 801/2022, LC SC 880/2025 e ficha funcional.';
  if (inst === 'pcsc') return 'Base: Lei SC 6.843/1986, Lei Federal 14.735/2023, normas estaduais e ficha funcional.';
  if (inst === 'pmes') return 'Base: Lei ES 3.196/1978, LC ES 420/2007, LC ES 910/2019, LC ES 911/2019 e ficha funcional.';
  if (inst === 'pces') return 'Base: Estatuto da PCES, LC ES 1.093/2024, Lei Federal 14.735/2023 e ficha funcional.';
  return 'Base: estatuto, lei de remuneração e ficha funcional.';
}

function getInsalubridadeTexto(inst) {
  if (isPoliciaPenal(inst)) {
    const info = getInfoPoliciaPenal(inst);
    return `${info.sigla}: ${info.vantagens} Insalubridade, periculosidade, risco de vida ou adicional de atividade penitenciária só devem ser tratados como verba quando houver lei local, laudo, lotação, rubrica e contracheque.`;
  }
  if (inst === 'prf') return 'PRF: adicional de insalubridade somente deve ser considerado quando houver previsão, laudo, lotação/atividade enquadrada e rubrica implantada. O subsídio de carreira não autoriza soma automática de adicional sem base individual.';
  if (inst === 'pmac') return 'Na PMAC, insalubridade, risco, serviço operacional ou verba equivalente devem ser tratados com cautela: dependem de lei local, laudo, lotação, rubrica, escala e contracheque. Não lançar como direito automático universal.';
  if (inst === 'pcac') return 'Na PCAC, eventual insalubridade ou adicional ligado à atividade deve ser conferido por cargo, lotação, laudo, legislação estadual, rubrica e contracheque; não é verba universal automática.';
  if (inst === 'pmesp' || inst === 'pcsp') return 'Em SP, pode haver adicional de insalubridade em graus mínimo, médio ou máximo, conforme enquadramento, laudo e legislação. Não é universal para todo servidor em qualquer função.';
  if (inst === 'pcerj') return 'Na PCERJ, a insalubridade aparece entre vantagens possíveis, mas deve ser separada do adicional de atividade perigosa. Depende de previsão legal e enquadramento.';
  if (inst === 'bmms') return 'No CBMMS, não lançar insalubridade/periculosidade automática sem previsão, laudo, rubrica, escala, lotação, decisão ou ato administrativo aplicável ao caso.';
  if (inst === 'pcpr') return 'Na PCPR, a LC 259/2023 indica que o subsídio compreende adicionais de insalubridade, periculosidade e risco de vida. Não lançar como verba separada sem decisão, rubrica ou tese específica.';
  if (inst === 'bmpr') return 'FASPM/PR: Lei PR 17.169/2012; ParanáPrevidência/proteção social militar: Lei Federal 13.954/2019 e normas estaduais aplicáveis.';
  if (inst === 'bmpr') return 'CBMPR/PR: conferir Código da PMPR aplicado ao CBMPR, leis de promoção, Lei PR 22.187/2024, Lei PR 22.916/2025, boletins, classe, posto/graduação e ficha funcional.';
  if (inst === 'pmpr') return 'Na PMPR, a remuneração é por subsídio. Não computar adicional de insalubridade automático sem rubrica específica, laudo, decisão ou previsão expressa aplicável ao caso.';
  if (inst === 'pmrs') return 'Na PMRS, não lançar adicional de insalubridade automático sem rubrica específica, laudo, decisão ou previsão expressa aplicável ao caso.';
  if (inst === 'pcrs') return 'Na PCRS, eventual insalubridade deve ser conferida por legislação, rubrica, laudo, lotação e situação funcional; não é verba universal automática.';
  if (inst === 'pmsc') return 'Na PMSC, não lançar adicional de insalubridade automático sem rubrica específica, laudo, decisão ou previsão expressa aplicável ao caso.';
  if (inst === 'pcsc') return 'Na PCSC, eventual insalubridade deve ser conferida por legislação, rubrica, laudo, lotação e situação funcional; não é verba universal automática.';
  if (inst === 'pmes') return 'Na PMES, não lançar adicional de insalubridade automático sem rubrica específica, laudo, decisão ou previsão expressa aplicável ao caso.';
  if (inst === 'pces') return 'Na PCES, eventual insalubridade deve ser conferida por legislação, rubrica, laudo, lotação e situação funcional; em carreiras por subsídio pode haver absorção de vantagens conforme regime/lei.';
  return 'Pode existir quando houver exposição reconhecida a agente insalubre, mediante laudo, enquadramento e previsão legal da instituição.';
}

function getInsalubridadeBase(inst) {
  if (isPoliciaPenal(inst)) {
    const info = getInfoPoliciaPenal(inst);
    return `Base: ${info.criacao}; laudo/ato administrativo, rubrica, lotação, escala e contracheque.`;
  }
  if (inst === 'prf') return 'Base: Lei nº 8.112/1990, normas federais de saúde ocupacional/SIASS, laudo técnico, portaria de concessão, lotação e contracheque.';
  if (inst === 'pmac' || inst === 'pcac') return 'Base: legislação estadual do Acre, tabela salarial oficial, laudo/ato administrativo, lotação, escala, rubrica e contracheque.';
  if (inst === 'pmesp' || inst === 'pcsp') return 'Conferir grau, base de cálculo, laudo e holerite. Para PMESP, a tabela SGGD/SP informa faixas de adicional, mas valor final depende da classificação oficial. Não confundir com periculosidade.';
  if (inst === 'bmms') return 'Base: Estatuto dos Militares Estaduais de MS, normas internas do CBMMS, laudo quando exigido, ato de designação, ficha funcional e contracheque.';
  if (inst === 'bmms') return 'Base: LC MS nº 127/2008, LC MS nº 291/2021, estatuto militar estadual, normas do CBMMS e contracheque.';
  if (inst === 'pcpr') return 'Base: LC PR 259/2023, art. 39, §3º; observar ADI indicada na própria legislação e decisões aplicáveis.';
  if (inst === 'bmpr') return 'FASPM/PR: Lei PR 17.169/2012; ParanáPrevidência/proteção social militar: Lei Federal 13.954/2019 e normas estaduais aplicáveis.';
  if (inst === 'bmpr') return 'CBMPR/PR: conferir Código da PMPR aplicado ao CBMPR, leis de promoção, Lei PR 22.187/2024, Lei PR 22.916/2025, boletins, classe, posto/graduação e ficha funcional.';
  if (inst === 'pmpr') return 'Base: regime de subsídio da carreira militar estadual do Paraná; conferir rubrica específica, laudo e legislação aplicável.';
  if (inst === 'pmrs' || inst === 'pcrs') return 'Base: legislação estadual do RS, laudo, rubrica de pagamento e enquadramento do local/função.';
  if (inst === 'pmsc' || inst === 'pcsc') return 'Base: legislação estadual de SC, laudo, rubrica de pagamento e enquadramento do local/função.';
  if (inst === 'pmes' || inst === 'pces') return 'Base: legislação estadual do ES, laudo, rubrica de pagamento e enquadramento do local/função.';
  return 'Depende de laudo, legislação estadual e enquadramento do local/função.';
}

function getPericulosidadeTexto(inst) {
  if (isPoliciaPenal(inst)) {
    const info = getInfoPoliciaPenal(inst);
    return `${info.sigla}: a atividade penal envolve custódia, vigilância, escolta, inteligência e segurança prisional. Eventual adicional de risco/periculosidade/atividade penitenciária depende da legislação da UF, rubrica e contracheque.`;
  }
  if (inst === 'prf') return 'PRF: risco policial e dedicação exclusiva integram o regime federal por subsídio. Tratar como verba separada somente indenizações ou rubricas com previsão própria, como indenização de fronteira, diárias ou missão, quando houver localidade, ato e escala aplicáveis.';
  if (inst === 'pmac') return 'PMAC: risco operacional, serviço complementar, localização especial ou gratificações semelhantes devem ser conferidos pela legislação acreana, escala, ato de designação e rubrica no contracheque. Não aplicar regra de outro Estado.';
  if (inst === 'pcac') return 'PCAC: adicional de atividade, risco, serviço complementar ou verba semelhante depende da lei local, cargo/classe, ato administrativo e contracheque. Não aplicar automaticamente percentuais de outros Estados.';
  if (inst === 'pcerj') return 'PCERJ: a Lei 11.003/2025 prevê adicional de atividade perigosa de 230% sobre o vencimento-base para policiais civis, salvo Delegados, que possuem verba de representação própria.';
  if (inst === 'bmms') return 'No CBMMS, não lançar insalubridade/periculosidade automática sem previsão, laudo, rubrica, escala, lotação, decisão ou ato administrativo aplicável ao caso.';
  if (inst === 'pcpr') return 'Na PCPR, a LC 259/2023 indica que o subsídio compreende o risco de vida e a periculosidade. Tratar como verba separada somente diante de rubrica, decisão ou tese específica.';
  if (inst === 'pcrs') return 'Na PCRS, eventual adicional ligado ao risco/atividade deve ser conferido em lei estadual, rubrica e contracheque; não aplicar automaticamente regra de outro Estado.';
  if (inst === 'pcsc') return 'Na PCSC, eventual adicional ligado ao risco/atividade deve ser conferido em lei estadual, rubrica e contracheque; não aplicar automaticamente regra de outro Estado.';
  if (inst === 'pces') return 'Na PCES, eventual adicional ligado ao risco/atividade deve ser conferido em lei estadual, rubrica e contracheque; no OIP e demais carreiras por subsídio, verificar se a vantagem foi absorvida pelo regime legal.';
  if (inst === 'pmesp' || inst === 'bmpr' || inst === 'bmrj' || inst === 'pmerj' || inst === 'pmmg' || inst === 'bmmg' || inst === 'pmba' || inst === 'pmpr' || inst === 'pmrs' || inst === 'pmsc' || inst === 'pmes') return 'Para militares estaduais, o risco da atividade costuma estar absorvido no regime remuneratório ou em verbas próprias. Não aplicar automaticamente o modelo da PCERJ.';
  return 'Pode haver gratificação ou adicional ligado ao risco/atividade, mas a regra muda bastante por Estado e carreira. Verificar norma específica.';
}

function getPericulosidadeBase(inst) {
  if (isPoliciaPenal(inst)) {
    const info = getInfoPoliciaPenal(inst);
    return `Base: ${info.criacao}; ${info.fonte}; legislação remuneratória e contracheque.`;
  }
  if (inst === 'prf') return 'Base: Lei nº 14.875/2024, Lei nº 12.855/2013, Lei nº 8.112/1990, atos de lotação/missão, SouGov e contracheque.';
  if (inst === 'bmap') return 'Base: LC AP nº 113/2018, LC AP nº 173/2025, DOE/AP, CBMAP, SEAD/AP, escalas, boletins, atos de designação e contracheque.';
  if (inst === 'pmac') return 'Base: LC AC 164/2006, LC AC 39/1993, tabelas PMAC/CBMAC, escalas, boletins, atos de designação e contracheque.';
  if (inst === 'pcac') return 'Base: leis remuneratórias da PCAC, Lei Orgânica Nacional das Polícias Civis, atos administrativos, escalas e contracheque.';
  if (inst === 'pcerj') return 'Base: Lei 11.003/2025/RJ, art. sobre adicional de atividade perigosa e verba de representação.';
  if (inst === 'bmms') return 'Base: Estatuto dos Militares Estaduais de MS, normas internas do CBMMS, laudo quando exigido, ato de designação, ficha funcional e contracheque.';
  if (inst === 'pcpr') return 'Base: LC PR 259/2023, art. 39, §3º, e decisões judiciais aplicáveis.';
  if (inst === 'bmpr') return 'FASPM/PR: Lei PR 17.169/2012; ParanáPrevidência/proteção social militar: Lei Federal 13.954/2019 e normas estaduais aplicáveis.';
  if (inst === 'bmpr') return 'CBMPR/PR: conferir Código da PMPR aplicado ao CBMPR, leis de promoção, Lei PR 22.187/2024, Lei PR 22.916/2025, boletins, classe, posto/graduação e ficha funcional.';
  if (inst === 'pmpr') return 'Base: Lei PR 22.187/2024 e regime de subsídio dos militares estaduais do Paraná.';
  if (inst === 'pmrs') return 'Base: estatuto e normas remuneratórias dos militares estaduais do RS.';
  if (inst === 'pcrs') return 'Base: Lei Estadual RS 12.350/2005, Lei Federal 14.735/2023 e normas remuneratórias estaduais aplicáveis.';
  if (inst === 'pmsc') return 'Base: estatuto e normas remuneratórias dos militares estaduais de SC.';
  if (inst === 'pcsc') return 'Base: Lei SC 6.843/1986, Lei Federal 14.735/2023 e normas remuneratórias estaduais aplicáveis.';
  if (inst === 'pmes') return 'Base: LC ES 420/2007, estatuto da PMES e normas remuneratórias dos militares estaduais do ES.';
  if (inst === 'pces') return 'Base: LC ES 1.093/2024, Lei Federal 14.735/2023 e normas remuneratórias estaduais aplicáveis.';
  return 'Base: estatuto e lei de remuneração da instituição; não usar regra genérica para todas as carreiras.';
}

function getVantagensEspecificas(inst) {
  let html = '';
  if (isPoliciaPenal(inst)) {
    const info = getInfoPoliciaPenal(inst);
    html += direitoItem(`${info.sigla} — Estrutura institucional e atribuições`, 'condicionado',
      `${info.marco} ${info.atribuicoes}`,
      `Base: ${info.criacao}; ${info.orgao}.`);
    html += direitoItem(`${info.sigla} — Adicionais, auxílios e verbas condicionadas`, 'condicionado',
      `${info.vantagens} ${info.remuneracao}`,
      'Conferir lei local, tabela oficial, edital, escala, ordem de serviço, laudo, rubrica e contracheque.');
    html += direitoItem(`${info.sigla} — Formação, porte, identidade funcional e prerrogativas`, 'condicionado',
      `${info.formacao} Prerrogativas, porte, uniforme, corregedoria e identidade funcional dependem da regulamentação da UF.`,
      `Base: Constituição Federal, art. 144, EC 104/2019 e legislação específica: ${info.criacao}.`);
    html += direitoItem(`${info.sigla} — Previdência, saúde e aposentadoria policial`, 'verificar',
      `${info.previdencia} ${info.saude}`,
      'A análise exige data de ingresso, tempo no cargo, sexo, idade, regra de transição, contribuição e ficha funcional.');
    return html;
  }
  if (inst === 'bmap') {
    html += direitoItem('BMAP — Subsídio, progressão horizontal e carreira', 'condicionado',
      'Tabela legal por posto/graduação e progressão horizontal foi cadastrada como referência de remuneração bruta legal. Conferir nível, data de promoção/progressão, quadro, ficha funcional e contracheque antes de qualquer cálculo.',
      'Base: LC AP 113/2018 alterada pela LC AP 173/2025, DOE/AP, SEAD/AP e atos funcionais.');
    html += direitoItem('BMAP — Diárias, serviço extraordinário e indenizações', 'condicionado',
      'Diárias, serviço extraordinário, alimentação, fardamento, indenização, função e parcelas pessoais dependem de previsão legal, escala, ordem de serviço, lotação e rubrica individual.',
      'Base: legislação estadual, boletins, escalas, ato de designação e contracheque.');
    html += direitoItem('BMAP — Reserva, reforma, pensão e ex-Território', 'verificar',
      'Amapá exige cautela adicional para não misturar quadro estadual do CBMAP com eventual vínculo federal de ex-Território/transposição. Conferir vínculo, regime, ato de ingresso e órgão pagador.',
      'Base: SEAD/AP, AMPRev, processo funcional, ato de transposição quando houver e contracheque.');
    return html;
  }
  if (inst === 'pmac') {
    html += direitoItem('PMAC — serviço complementar / escala extraordinária', 'condicionado',
      'Pode existir remuneração ou indenização vinculada a escala extraordinária, serviço complementar, missão, deslocamento ou ato formal. Só considerar quando houver convocação, escala, boletim, ordem de serviço e rubrica.',
      'Base: normas estaduais do Acre, atos internos da PMAC, tabela oficial, escala e contracheque.');
    html += direitoItem('PMAC — localização especial, chefia e representação', 'condicionado',
      'Verbas de localidade, chefia, representação, função ou vantagem pessoal exigem conferência do posto/graduação, lotação, ato de designação e período trabalhado.',
      'Base: LC AC 164/2006, LC AC 39/1993, Portal de Tabelas Salariais do Acre e ficha funcional.');
    html += direitoItem('PMAC — reserva, reforma e proteção previdenciária', 'verificar',
      'Reserva remunerada, reforma, abono de permanência e regra de transição exigem análise individual de ingresso, idade, tempo militar, tempo de contribuição e atos da Acreprevidência.',
      'Base: Constituição Federal, EC 103/2019, normas estaduais, Acreprevidência e histórico funcional.');
  } else if (inst === 'pcac') {
    html += direitoItem('PCAC — progressão por classe, titulação e enquadramento', 'condicionado',
      'Delegado, Perito, Médico-Legista, Agente, Escrivão, Papiloscopista e Auxiliar de Necropsia têm tabelas e regras próprias. Conferir classe, cargo, titulação aceita, ato de progressão e rubricas pagas.',
      'Base: Lei AC 2.250/2009, Lei AC 3.228/2017, LC AC 303/2015, Lei AC 3.107/2015, tabela oficial e ficha funcional.');
    html += direitoItem('PCAC — serviço complementar e vantagens pessoais', 'condicionado',
      'Serviço complementar, vantagens absorvidas, indenizações e plantões devem ser analisados pela lei local, autorização, período, escala e contracheque, sem soma automática ao vencimento-base.',
      'Base: Portal do Estado do Acre — Tabelas Salariais, atos da PCAC/SEAD e demonstrativos de pagamento.');
    html += direitoItem('PCAC — aposentadoria policial e abono de permanência', 'verificar',
      'Aposentadoria policial, paridade/integralidade quando cabível, transições e abono de permanência dependem da data de ingresso, tempo no cargo, tempo policial, idade e regra aplicada.',
      'Base: Lei Orgânica Nacional das Polícias Civis, EC 103/2019, Acreprevidência e ficha funcional.');
  } else if (inst === 'prf') {
    html += direitoItem('PRF — subsídio federal 2026 por classe e padrão', 'verificar',
      'A carreira de Policial Rodoviário Federal é remunerada por subsídio. A tabela de 01/05/2026 vai de R$ 12.253,84 na 3ª Classe/Padrão I a R$ 23.000,00 na Classe Especial/Padrão III; benefícios e indenizações não foram somados automaticamente.',
      'Base: Lei nº 14.875/2024, Anexo XXVII; conferir classe, padrão, ato funcional e contracheque/SouGov.');
    html += direitoItem('PRF — progressão, promoção e enquadramento', 'condicionado',
      'Progressão e promoção dependem de interstício, avaliação, classe/padrão, requisitos da carreira e atos publicados. Diferença retroativa exige erro concreto de enquadramento ou implantação tardia.',
      'Base: Lei nº 9.654/1998, Lei nº 12.775/2012, Decreto nº 8.282/2014 e ficha funcional.');
    html += direitoItem('PRF — indenização de fronteira, diárias e missão', 'condicionado',
      'Indenização de fronteira, diárias, ajuda de custo, transporte e missão operacional dependem de lotação/localidade, designação, dias efetivos, disponibilidade orçamentária e rubrica específica. Não somar como salário fixo.',
      'Base: Lei nº 12.855/2013, Lei nº 8.112/1990, atos de missão/lotação, SouGov e demonstrativo de pagamento.');
    html += direitoItem('PRF — aposentadoria policial, abono e previdência federal', 'verificar',
      'Aposentadoria policial, regra de transição, abono de permanência e contribuição ao RPPS exigem análise individual de data de ingresso, idade, tempo policial, tempo total e regra aplicada.',
      'Base: Constituição Federal, EC 103/2019, LC nº 51/1985, LC nº 144/2014, Lei nº 8.112/1990 e ficha funcional.');
  } else if (inst === 'pmesp') {
    html += direitoItem('DEJEM / Diária Especial por Jornada Extraordinária', 'condicionado',
      'Verba eventual para jornada extraordinária, quando houver escala, autorização e cumprimento do serviço.',
      'Depende de escala, disponibilidade, limite mensal e norma vigente.');
    html += direitoItem('Lei 18.441/2026 — vencimento-base PMESP', 'verificar',
      'A Lei 18.441/2026 reclassificou os vencimentos-base a partir de 01/04/2026. Isso não é sinônimo de remuneração total: RETP, representação, adicionais, quinquênios, sexta-parte e rubricas pessoais exigem conferência no holerite.',
      'Base: Lei SP 18.441/2026, tabela SGGD/SP e demonstrativo de pagamento individual.');
    html += direitoItem('Lei 18.442/2026 — promoção, quadros e efetivo legal', 'condicionado',
      'A carreira deve ser lida com a reorganização de 2026: efetivo legal de 93.802 cargos, quadros QOEM, QOE, QOS, QOM, QORR e QP e regras gerais de promoção. A promoção depende do quadro, curso, interstício, conduta e vaga.',
      'Base: Lei SP 18.442/2026; conferir Boletim Geral, ficha funcional, atos de enquadramento e cursos exigidos.');
    html += direitoItem('CBPM / Cruz Azul', 'condicionado',
      'Benefício de assistência institucional dos militares paulistas. A contribuição e a cobertura dependem de regra própria, vínculo, dependentes e situação funcional; não tratar como plano de saúde comercial comum.',
      'Base: CBPM/SP, Cruz Azul, SPSM e normas administrativas vigentes.');
  } else if (inst === 'pcsp') {
    html += direitoItem('DEJEC / Diária Especial por Jornada Extraordinária', 'condicionado',
      'Verba eventual para jornada extraordinária na Polícia Civil/SP, quando autorizada e efetivamente cumprida. A Lei 18.440/2026 prevê jornada extraordinária de 8 horas contínuas fora da jornada normal, com limite mensal e coeficientes próprios por carreira.',
      'Base: Lei SP 18.440/2026; conferir escala, autorização, limite de até 10 diárias mensais, coeficiente aplicável e holerite.');
    html += direitoItem('Lei 18.443/2026 — classes, promoção e evolução funcional', 'condicionado',
      'A carreira policial civil paulista foi organizada em 3ª Classe, 2ª Classe, 1ª Classe e Classe Especial. Promoções dependem de interstício, avaliação satisfatória, Curso Específico de Aperfeiçoamento e ausência de impedimentos.',
      'Base: Lei SP 18.443/2026; conferir classe, cargo, histórico disciplinar, curso e atos publicados.');
    html += direitoItem('Lei 18.441/2026 — vencimentos-base', 'verificar',
      'A lei reclassificou os vencimentos-base a partir de 01/04/2026. Isso não é remuneração total: RETP, ADPJ, representação, quinquênios, sexta-parte, insalubridade e rubricas pessoais precisam ser conferidos na tabela oficial e no holerite.',
      'Base: Lei SP 18.441/2026, tabela SGGD/SP julho/2025 e demonstrativo de pagamento individual.');
    html += direitoItem('RETP, quinquênios e sexta-parte', 'verificar',
      'RETP, adicional por tempo de serviço e sexta-parte exigem conferência da base de cálculo, tempo de serviço, cargo, classe e rubricas incluídas ou excluídas.',
      'Base: LC SP 547/1988, Constituição do Estado de SP art. 129 e ficha financeira.');
    html += direitoItem('IAMSPE, auxílio-alimentação e assistência', 'condicionado',
      'Podem existir assistência pelo IAMSPE e auxílio-alimentação conforme vínculo, contribuição, dias efetivamente trabalhados e regras estaduais. Não somar automaticamente ao salário bruto.',
      'Base: IAMSPE/Lei SP 17.293/2020; Lei SP 7.524/1991; conferir cadastro, contracheque e situação funcional.');
  } else if (inst === 'bmrj') {
    html += direitoItem('Triênio/ATS preservado', 'condicionado',
      'Para ingressos por edital publicado até 31/12/2021, o adicional por tempo de serviço pode variar de 10% a 60% e incide sobre soldo + GHP + GRET + GRAM. Para editais publicados a partir de 01/01/2022, observar a LC RJ 194/2021.',
      'Base: Lei RJ 1.608/1990, LC RJ 194/2021 e Caderno de Remuneração GESPERJ/RJ jan/2026.');
    html += direitoItem('GRET, GHP e GRAM', 'verificar',
      'A tabela SEDEC/CBMERJ usa soldo + GRET + GHP + GRAM. Conferir percentual, habilitação, posto/graduação, rubrica e enquadramento antes de calcular diferença.',
      'Base: Lei RJ 279/1979, Lei RJ 9.537/2021, Decreto RJ 47.902/2021 e Caderno de Remuneração jan/2026.');
    html += direitoItem('PTTC para inativos militares', 'condicionado',
      'Militares inativos podem atuar em tarefa por tempo certo, com adicional próprio e regras de pagamento previstas para a PTTC.',
      'Base: Lei RJ 5.271/2008, Lei RJ 11.042/2025 e Decreto RJ 50.126/2026.');
    html += direitoItem('Férias/licenças em pecúnia e assistência', 'condicionado',
      'Férias, licença especial, assistência médica/medicamentos e assistência jurídica dependem de ato, documentação individual, vínculo e norma vigente.',
      'Base: Lei RJ 279/1979, Decreto RJ 48.466/2023, Portarias CBMERJ e Leis RJ 10.845/2025 e 10.850/2025.');
  } else if (inst === 'bmms') {
    html += direitoItem('Subsídio CBMMS — posto/graduação e nível', 'verificar',
      'Tabela por subsídio e nível. Conferir posto/graduação, nível, enquadramento, RGA 2026 e implantação no contracheque.',
      'Base: LC MS nº 127/2008, LC MS nº 291/2021 e Lei MS nº 6.562/2026.');
    html += direitoItem('Efetivo legal e promoções', 'condicionado',
      'O efetivo legal de 3.978 integrantes deve ser usado para controle de carreira, vagas e promoções, sem confundir com efetivo ativo em serviço.',
      'Base: LC MS nº 354/2025, normas de promoção, boletins e ficha funcional.');
    html += direitoItem('Ajuda de custo, fardamento e indenizações', 'condicionado',
      'Parcelas indenizatórias e eventuais dependem de missão, escala, curso, função, ato publicado e rubrica específica.',
      'Base: estatuto militar estadual, normas internas do CBMMS, DOE/MS e contracheque.');
  } else if (inst === 'pmerj') {
    html += direitoItem('Triênio/ATS preservado', 'condicionado',
      'Para ingressos por edital publicado até 31/12/2021, o adicional por tempo de serviço pode variar de 10% a 60% e incide sobre soldo + GHP + GRET + GRAM. Para editais publicados a partir de 01/01/2022, a LC RJ 194/2021 extinguiu o triênio.',
      'Base: Lei RJ 1.608/1990, LC RJ 194/2021 e Caderno de Remuneração GESPERJ/RJ jan/2026.');
    html += direitoItem('PROEIS / PROESP / RAS', 'condicionado',
      'Vantagens de serviço adicional e programas operacionais dependem de escala, autorização, limite, cadastro e efetiva prestação do serviço.',
      'Base: Decreto RJ 49.988/2025 e normas da SEPM/PMERJ.');
    html += direitoItem('PTTC para inativos militares', 'condicionado',
      'Militares inativos podem atuar em tarefa por tempo certo, com adicional próprio e regras de pagamento previstas para a PTTC.',
      'Base: Lei RJ 5.271/2008, Lei RJ 11.042/2025 e Decreto RJ 50.126/2026.');
    html += direitoItem('Assistência médica, medicamentos e assistência jurídica', 'condicionado',
      'Lei estadual prevê assistência médica e fornecimento de remédios a policiais militares; o PRAJAS autoriza programa de assistência jurídica gratuita a agentes de segurança pública.',
      'Base: Lei RJ 10.845/2025 e Lei RJ 10.850/2025.');
  } else if (inst === 'pcerj') {
    html += direitoItem('Gratificação Técnico-Científica', 'condicionado',
      'Pode ser aplicável a carreiras técnico-científicas, como peritos e médicos legistas, conforme enquadramento legal.',
      'Base: Lei 11.003/2025/RJ e cargo ocupado.');
    html += direitoItem('Verba de Representação — Delegado', 'condicionado',
      'Delegados possuem tratamento remuneratório próprio, com verba de representação prevista na reestruturação da PCERJ.',
      'Base: Lei 11.003/2025/RJ. Aplicável apenas ao cargo correspondente.');
    html += direitoItem('Auxílio-Transporte / Diárias / Auxílios específicos', 'condicionado',
      'A nova estrutura da PCERJ lista vantagens e indenizações específicas que devem ser verificadas conforme lotação, deslocamento e situação funcional.',
      'Conferir Lei 11.003/2025/RJ e regulamentação interna.');
  } else if (inst === 'pmmg') {
    html += direitoItem('ADE / VPNI / Vantagens de transição', 'condicionado',
      'ADE, VPNI e parcelas de transição podem aparecer conforme avaliação, histórico funcional e regra remuneratória individual.',
      'Conferir ficha financeira, avaliações e legislação mineira atualizada.');
  } else if (inst === 'bmpr') {
    html += direitoItem('Subsídio CBMPR por classe', 'verificar',
      'Lei PR 22.187/2024: carreira militar estadual por subsídio, posto/graduação e classe. Conferir enquadramento, promoção, implantação e contracheque.',
      'Base: Lei PR 22.187/2024, Anexo I, Tabela I; Administração/PR — Carreiras e Tabelas Salariais.');
    html += direitoItem('Auxílio-alimentação PR', 'condicionado',
      'Valor de referência R$ 834,74, não somado automaticamente ao subsídio; conferir elegibilidade e lançamento.',
      'Base: Lei PR 20.937/2021, Lei PR 22.208/2024 e tabelas Administração/PR.');
    html += direitoItem('FASPM facultativo', 'condicionado',
      'Assistência à saúde facultativa, com regras de titular, dependentes, contribuição e limite legal.',
      'Base: Lei PR 17.169/2012 e normas do FASPM.');
    html += direitoItem('ParanáPrevidência / proteção social militar', 'verificar',
      'Conferir contribuição, base de cálculo, inatividade e pensão conforme situação funcional.',
      'Base: Lei Federal 13.954/2019, ParanáPrevidência e contracheque.');
  } else if (inst === 'bmmg') {
    html += direitoItem('CBMMG — ajuda de custo, abono fardamento e IPSM', 'condicionado',
      'Ajuda de custo para alimentação, abono fardamento, assistência IPSM e verbas ligadas a curso, escala, função ou operação dependem de norma, ato, dias trabalhados e contracheque.',
      'Base: Lei MG 25.804/2026, Decreto MG 49.006/2025, editais CBMMG 09/2026 e 10/2026, Estatuto dos Militares/MG e normas do IPSM.');
  } else if (inst === 'pcmg') {
    html += direitoItem('ADE / Gratificação de Aprimoramento Profissional', 'condicionado',
      'Podem existir vantagens por desempenho, formação, titulação ou aprimoramento profissional, conforme cargo e legislação da PCMG.',
      'Conferir plano de carreira, titulação aceita e percentuais vigentes.');
  } else if (inst === 'pmba' || inst === 'pcba') {
    html += direitoItem('CET — Condição Especial de Trabalho', 'condicionado',
      'Gratificação variável ligada a condição especial de trabalho, função ou local de exercício. Não deve ser tratada como valor fixo universal.',
      'Conferir percentual, cargo, setor, publicação e legislação estadual da Bahia.');
  } else if (inst === 'pmpr') {
    html += direitoItem('Auxílio-Alimentação PMPR', 'automatico',
      'Valor mensal padrão de R$ 834,74 para servidores ativos, destacado como verba indenizatória no simulador.',
      'Base: Lei PR 22.208/2024 e informação oficial de formas de ingresso da PMPR.');
    html += direitoItem('FASPM', 'condicionado',
      'Assistência à saúde militar com contribuição facultativa. No simulador, o desconto só entra se o usuário selecionar a opção FASPM.',
      'Base: Lei PR 17.169/2012: 0,5% + 0,2% por dependente, limitado a 2%.');
  } else if (inst === 'pcpr') {
    html += direitoItem('Auxílio-Alimentação PCPR', 'automatico',
      'Valor mensal padrão de R$ 834,74 para servidores ativos, destacado como verba indenizatória no simulador.',
      'Base: Lei PR 22.208/2024 e regras estaduais de auxílio-alimentação.');
    html += direitoItem('Diária especial / extrajornada voluntária', 'condicionado',
      'Pode existir quando houver escala, autorização e cumprimento de jornada extraordinária prevista em norma. Não é verba fixa mensal.',
      'Base: LC PR 259/2023, rol de vantagens/indenizações e regulamentação administrativa.');
  } else if (inst === 'pmrs') {
    html += direitoItem('Auxílio-Alimentação BM/RS', 'automatico',
      'Valor de R$ 400,00 informado nos editais oficiais 2025 de Soldado e Oficialato da Brigada Militar.',
      'Base: editais oficiais da Brigada Militar/RS.');
    html += direitoItem('Diárias / serviço extraordinário', 'condicionado',
      'Pode existir quando houver escala, autorização, deslocamento ou serviço extraordinário previsto em norma. Não é verba fixa mensal.',
      'Conferir legislação estadual, publicação da escala e contracheque.');
  } else if (inst === 'pcrs') {
    html += direitoItem('Dedicação exclusiva / jornada de 40 horas', 'condicionado',
      'Editais da PCRS indicam regime estatutário, 40 horas semanais e dedicação exclusiva para os cargos policiais.',
      'Base: editais oficiais 2025 da Polícia Civil/RS.');
    html += direitoItem('Diárias / indenizações / serviço extraordinário', 'condicionado',
      'Podem existir conforme lotação, deslocamento, autorização e legislação estadual. Não são verbas fixas universais.',
      'Conferir rubrica, contracheque, legislação estadual e normas internas.');
  } else if (inst === 'pmsc') {
    html += direitoItem('Auxílio-Alimentação PMSC', 'automatico',
      'Valor de referência de R$ 550,00 para 40h em Santa Catarina, com caráter indenizatório e sem incorporação ao subsídio.',
      'Base: Lei SC 18.796/2023, com redação da Lei SC 19.059/2024.');
    html += direitoItem('Diárias / serviço extraordinário / indenizações', 'condicionado',
      'Podem existir conforme escala, deslocamento, autorização, local de serviço e norma específica. Não são verbas fixas mensais.',
      'Conferir legislação estadual, publicação da escala, ordem de serviço e contracheque.');
  } else if (inst === 'pcsc') {
    html += direitoItem('Auxílio-Alimentação PCSC', 'automatico',
      'Valor de referência de R$ 550,00 para 40h. Nos editais PCSC 2025, aparece compondo o total divulgado para Agente e Escrivão.',
      'Base: Lei SC 18.796/2023, Lei SC 19.059/2024 e editais PCSC 2025.');
    html += direitoItem('Dedicação exclusiva / regime policial civil', 'condicionado',
      'A carreira policial civil exige conferência do cargo, classe, jornada, lotação e regras próprias do estatuto e da Lei Orgânica Nacional.',
      'Base: Lei SC 6.843/1986, Lei Federal 14.735/2023 e regulamentação estadual.');
  } else if (inst === 'pmes') {
    html += direitoItem('Auxílio-Alimentação PMES', 'condicionado',
      `Auxílio-alimentação deve ser conferido por edital, norma e rubrica vigente. O simulador usa referência ES de ${fmt(AUX_ALIM_ES_PADRAO)} apenas como verba informativa, sem somar automaticamente ao bruto.`,
      'Base: editais PMES, legislação estadual e contracheque.');
    html += direitoItem('Auxílio-Fardamento / serviço extraordinário', 'condicionado',
      'Pode existir conforme regra própria, fornecimento ou indenização de fardamento, escala e autorização de serviço extra.',
      'Base: LC ES 420/2007, editais PMES, legislação de fardamento/indenização e atos internos.');
  } else if (inst === 'pces') {
    html += direitoItem('Auxílio-Alimentação PCES', 'automatico',
      `Concurso OIP 2025 informa auxílio-alimentação de ${fmt(AUX_ALIM_ES_PADRAO)} além da remuneração inicial. Conferir rubrica e regra vigente para cada carreira.`,
      'Base: divulgação oficial PCES do concurso OIP 2025.');
    html += direitoItem('Serviço extraordinário / escalas especiais', 'condicionado',
      'Para OIP, a LC ES 1.093/2024 prevê possibilidade de serviço extraordinário sujeito a disponibilidade, interesse de serviço, candidatura prévia e escala, com limite mensal.',
      'Base: LC ES 1.093/2024 e regulamentação do Estado.');
  }
  return html;
}

function getStatusAposentadoria(tempo, idade, requisitosApos) {
  if (requisitosApos === 'sim') return 'condicionado';
  if (tempo >= 30 && idade >= 55) return 'verificar';
  return 'atencao';
}

function getAposentadoriaTexto(inst, tempo, idade, sexo, requisitosApos, ingressoAntesEC103) {
  const tipo = String(inst || '').startsWith('pm') ? 'reserva remunerada/reforma' : 'aposentadoria policial';
  if (requisitosApos === 'sim') {
    return `Você informou que os requisitos de ${tipo} já foram cumpridos. O próximo passo é confirmar a regra usada, cálculo, paridade/integralidade quando cabível e eventual abono de permanência.`;
  }
  if (tempo >= 30 && idade >= 55) {
    return `Tempo e idade informados indicam possível proximidade de ${tipo}, mas isso não basta para afirmar direito automático. É indispensável conferir data de ingresso, sexo, tempo no cargo/carreira e regra de transição.`;
  }
  const idadeTxt = idade ? `${idade} ano(s) de idade` : 'idade não informada';
  const sexoTxt = sexo === 'na' ? 'sexo não informado' : `sexo ${sexo}`;
  const ingressoTxt = ingressoAntesEC103 ? 'ingresso informado antes da EC 103/2019' : 'ingresso não informado ou posterior à EC 103/2019';
  return `Com ${tempo} ano(s) de contribuição policial, ${idadeTxt}, ${sexoTxt} e ${ingressoTxt}, a análise previdenciária deve ser individual. Não é seguro afirmar direito adquirido apenas por este simulador.`;
}

/* ============================================================ */
