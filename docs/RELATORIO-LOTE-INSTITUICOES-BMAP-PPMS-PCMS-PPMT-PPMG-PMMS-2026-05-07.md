# Relatório de lote — BMAP, PPMS, PCMS, PPMT, PPMG e PMMS — 07/05/2026

## Escopo aplicado
Foram aplicadas alterações reais no código do portal UniSegPub usando como base o ZIP da atualização BMBA. O lote corrige a falha anterior: as instituições não ficaram apenas em dossiê textual; agora há mudanças em arquivos `.js` e relatórios em `docs/`.

## Instituições do lote
- BMAP/CBMAP — revisão complementar, entradas estáticas e direitos como bombeiro militar.
- PPMS — Polícia Penal/MS com tabela AGEPEN/MS 2026, concursos, ações e associações.
- PCMS — Polícia Civil/MS com APJ/2025, subsídios e cautelas da LC MS 343/2024.
- PPMT — Polícia Penal/MT com tabela SEPLAG-MT 40h e cautelas de carreira.
- PPMG — Polícia Penal/MG com edital 2025/2026, 1.178 vagas e Instituto AOCP.
- PMMS — Polícia Militar/MS com tabela militar 05/2025, comando e direitos militares.

## Arquivos alterados
- `js/data/concursos-data.js`
- `js/data/associacoes-data.js`
- `js/data/acoes-judiciais-data.js`
- `js/services/direitos.js`
- `js/ui/navegacao-ui.js`
- `docs/RELATORIO-ATUALIZACAO-*.md`
- `docs/FILA-ATUALIZACOES-INSTITUICOES-2026-05-07.md`

## Validação técnica
Executados sem erro:
- `node --check js/data/concursos-data.js`
- `node --check js/data/associacoes-data.js`
- `node --check js/data/acoes-judiciais-data.js`
- `node --check js/ui/navegacao-ui.js`
- `node --check js/services/direitos.js`
- `node --check js/ui/header-estados.js`
- `node --check js/data/policia-penal.js`
- `node --check js/data/parametros-cargos.js`
- `node --check js/services/remuneracao.js`

## Observações de cautela
- Foram mantidas estimativas quando não havia fonte pública consolidada.
- As remunerações foram tratadas como tabela legal, subsídio ou referência de edital; não como remuneração total individual.
- Ações judiciais foram escritas como temas possíveis/conferências individuais, sem promessa de ganho automático.
- A próxima entrega deve retomar a fila a partir de PPSP, PMPR e PPES, salvo nova medição de campos pendentes no código atualizado.
