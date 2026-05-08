# Relatório de atualização — PCMS — 07/05/2026

## Escopo aplicado
Consolidar a PCMS com dados de concurso APJ/2025, subsídios legais, estrutura institucional e cautelas de carreira no padrão PMESP.

## Campos revisados
- HEADER_INSTITUICOES_RESUMO preenchido com origem, efetivo, população, governador, delegado-geral e fontes.
- CARGOS_PCMS já cadastrado com linhas por cargo/classe/referência, incluindo APJ, Perito Papiloscopista e Delegado.
- CONCURSOS.pcms atualizado com 400 vagas APJ/2025, 300 Investigadores, 100 Escrivães, remuneração inicial R$ 6.569,53 e etapas do certame.
- ASSOCIACOES.pcms com SINPOL-MS, ADEPOL-MS e entidades por carreira.
- ACOES_JUDICIAIS.pcms com concurso/nomeação, classe/referência/progressão e aposentadoria policial.
- Remuneração e direitos com LC MS 114/2005, LC MS 343/2024 e observação de auxílio/etapa alimentação compreendidos no subsídio quando aplicável.

## Arquivos alterados
- `js/ui/header-estados.js`
- `js/data/parametros-cargos.js`
- `js/services/remuneracao.js`
- `js/data/concursos-data.js`
- `js/data/associacoes-data.js`
- `js/data/acoes-judiciais-data.js`
- `js/services/direitos.js`
- `js/ui/navegacao-ui.js`

## Validação técnica
- `node --check` executado nos arquivos JS modificados do lote sem erro de sintaxe.
- Chave institucional revisada: `pcms`.
- Campos sem fonte exata foram mantidos como estimativa, aprox. ou consulta oficial, sem transformar projeções em números definitivos.

## Fontes de referência
- SEJUSP/MS — concurso APJ/2025; LC MS 114/2005; LC MS 343/2024; PCMS; AGEPREV/MS; Diário Oficial/MS.

## Observações de cautela
- Remuneração inicial do concurso não foi tratada como remuneração total futura; progressões, abonos e verbas condicionadas dependem de classe, referência e contracheque.
- Não tratar vantagem, ação judicial, adicional, indenização ou aposentadoria como automática sem conferir lei, ficha funcional, ato administrativo e contracheque.
- Não confundir vencimento-base, subsídio ou salário inicial de edital com remuneração total individual.
