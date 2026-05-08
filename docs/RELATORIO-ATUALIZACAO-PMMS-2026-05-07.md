# Relatório de atualização — PMMS — 07/05/2026

## Escopo aplicado
Consolidar PMMS com comando atual, tabela militar MS 05/2025, concursos, ações, associações e direitos de reserva/reforma.

## Campos revisados
- HEADER_INSTITUICOES_RESUMO preenchido com origem histórica, efetivo, reserva estimada, população, comandante-geral e fontes.
- CARGOS_PMMS já cadastrado com tabela militar MS 05/2025 por posto/graduação e níveis, além de linha histórica de aluno-soldado.
- CONCURSOS.pmms preenchido com último ciclo PMMS/2022, IDECAN, etapas, cautelas e tabela de referência.
- ASSOCIACOES.pmms e ACOES_JUDICIAIS.pmms cadastradas para promoção, escalas, adicionais, reserva, reforma e abono.
- Direitos ajustados para cautela militar estadual, sistema de proteção social e AGEPREV/MS.

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
- Chave institucional revisada: `pmms`.
- Campos sem fonte exata foram mantidos como estimativa, aprox. ou consulta oficial, sem transformar projeções em números definitivos.

## Fontes de referência
- PMMS — página Comando e Conheça a PMMS; Diário Oficial/MS; AGEPREV/MS; Concursos MS; tabela militar MS 05/2025.

## Observações de cautela
- Valores exibidos como tabela remuneratória legal; indenizações, etapa, fardamento, serviço extraordinário e parcelas pessoais dependem de lei, escala e contracheque.
- Não tratar vantagem, ação judicial, adicional, indenização ou aposentadoria como automática sem conferir lei, ficha funcional, ato administrativo e contracheque.
- Não confundir vencimento-base, subsídio ou salário inicial de edital com remuneração total individual.
