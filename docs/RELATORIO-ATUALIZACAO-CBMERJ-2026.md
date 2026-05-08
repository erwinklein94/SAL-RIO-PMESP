# Relatório de atualização — CBMERJ/RJ — 2026

## 1. Escopo aplicado
Atualização institucional do Corpo de Bombeiros Militar do Estado do Rio de Janeiro (`bmrj`/CBMERJ), usando a PMESP como modelo de cadastro e a chave já existente de bombeiros do Rio de Janeiro no projeto.

## 2. Campos revisados
- Cadastro mestre da instituição `bmrj` e vínculo `HEADER_ESTADOS.rj.bm`.
- Identificação, brasão, resumo institucional, comando, sede, emergência, links oficiais e histórico.
- Efetivo ativo de 12.916 militares conforme Anuário CBMERJ 2024.
- População do RJ como 17.223.547 habitantes (estimado IBGE 2025), com label de estimativa ao lado do número.
- Reserva/inativos e efetivo feminino mantidos como `Dados em breve`, sem inferência.
- Aba de remuneração tabelada detalhada, com totais oficiais SEDEC/GESPERJ de janeiro/2026 por posto/graduação.
- Concursos, associações, ações judiciais e textos do simulador de direitos.

## 3. Arquivos alterados
- `js/data/portal-config.js`
- `js/ui/header-estados.js`
- `js/data/parametros-cargos.js`
- `js/services/remuneracao.js`
- `js/services/direitos.js`
- `js/data/concursos-data.js`
- `js/data/associacoes-data.js`
- `js/data/acoes-judiciais-data.js`
- `js/ui/navegacao-ui.js`
- `docs/RELATORIO-ATUALIZACAO-CBMERJ-2026.md`

## 4. Validação técnica
Executar `node --check` nos arquivos JS alterados após a atualização final.

## 5. Fontes de referência
- CBMERJ/SEDEC-RJ — portal institucional, estrutura, comando, concursos e histórico.
- GESPERJ/RJ — Caderno de Remuneração janeiro/2026.
- IBGE — estimativa populacional 2025.
- IDECAN/CBMERJ — edital Soldado BM QBMP 1.

## 6. Observações de cautela
- Não foi inventado número para reserva/inativos ou efetivo feminino.
- Valores de remuneração usam total bruto oficial da tabela SEDEC/GESPERJ jan/2026; rubricas pessoais, triênio, SPSMERJ, PTTC, diárias e indenizações não foram somados.
- População aparece com `(estimado)` no label.
