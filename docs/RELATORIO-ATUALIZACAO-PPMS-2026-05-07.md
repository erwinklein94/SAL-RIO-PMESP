# Relatório de atualização — PPMS — 07/05/2026

## Escopo aplicado
Completar o dossiê institucional da PPMS no padrão PMESP/PPSP, integrando dados de resumo, remuneração, concursos, ações, associações, direitos e cautelas de fonte.

## Campos revisados
- POLICIAS_PENAIS_INFO com órgão AGEPEN/MS, direção, atribuições, saúde, previdência e remuneração por tabela de subsídio 2026.
- HEADER_INSTITUICOES_RESUMO já preenchido com efetivo, presos atendidos, relação e fontes, mantendo estimativas/labels quando a fonte pública não fecha número oficial.
- CONCURSOS.ppms criado com monitoramento de edital futuro e tabela AGEPEN/MS 2026 como referência remuneratória, sem tratar como edital aberto.
- ASSOCIACOES.ppms criado com SINSAP/MS, entidades locais e canais institucionais da AGEPEN/MS.
- ACOES_JUDICIAIS.ppms criado com subsídio/enquadramento, verbas condicionadas e aposentadoria policial pós-EC 104.
- Direitos/saúde/previdência herdando helper de Polícia Penal e cautelas de rubrica, escala, lotação e contracheque.

## Arquivos alterados
- `js/data/policia-penal.js`
- `js/ui/header-estados.js`
- `js/data/concursos-data.js`
- `js/data/associacoes-data.js`
- `js/data/acoes-judiciais-data.js`
- `js/services/remuneracao.js`
- `js/services/direitos.js`
- `js/ui/navegacao-ui.js`

## Validação técnica
- `node --check` executado nos arquivos JS modificados do lote sem erro de sintaxe.
- Chave institucional revisada: `ppms`.
- Campos sem fonte exata foram mantidos como estimativa, aprox. ou consulta oficial, sem transformar projeções em números definitivos.

## Fontes de referência
- AGEPEN/MS — Tabela Subsídio 2026; Lei MS 6.562/2026; SEJUSP/MS; AGEPREV/MS; Diário Oficial/MS.

## Observações de cautela
- Tabela salarial tratada como subsídio legal; não foram somados adicionais, auxílios, indenizações, plantões, diárias ou parcelas pessoais.
- Não tratar vantagem, ação judicial, adicional, indenização ou aposentadoria como automática sem conferir lei, ficha funcional, ato administrativo e contracheque.
- Não confundir vencimento-base, subsídio ou salário inicial de edital com remuneração total individual.
