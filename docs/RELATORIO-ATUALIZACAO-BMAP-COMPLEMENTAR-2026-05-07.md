# Relatório de atualização — BMAP-COMPLEMENTAR — 07/05/2026

## Escopo aplicado
Revisão complementar do BMAP/CBMAP para refletir também as entradas estáticas de concursos, associações, ações judiciais, navegação e direitos.

## Campos revisados
- BMAP já existia no código-base BMBA com resumo, remuneração, cargos, ações e associações aplicadas em header-estados.js.
- Foram criadas entradas estáticas em CONCURSOS, ASSOCIACOES e ACOES_JUDICIAIS para reduzir dependência de aplicação dinâmica e alinhar com o padrão PMESP.
- Navegação e popularCargos passaram a reconhecer bmap/CARGOS_BMAP diretamente.
- Direitos passou a tratar BMAP como militar estadual para reserva/reforma, saúde, progressão, rubricas condicionadas e cautela ex-Território.

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
- Chave institucional revisada: `bmap`.
- Campos sem fonte exata foram mantidos como estimativa, aprox. ou consulta oficial, sem transformar projeções em números definitivos.

## Fontes de referência
- CBMAP; SEAD/AP; Diário Oficial/AP; LC AP 113/2018; LC AP 173/2025; Fundação Carlos Chagas; IBGE; Portal da Transparência/AP.

## Observações de cautela
- Reserva, mulheres e pensionistas seguem como estimativas identificadas; remuneração estadual não deve ser misturada com quadros federais/ex-Território.
- Não tratar vantagem, ação judicial, adicional, indenização ou aposentadoria como automática sem conferir lei, ficha funcional, ato administrativo e contracheque.
- Não confundir vencimento-base, subsídio ou salário inicial de edital com remuneração total individual.
