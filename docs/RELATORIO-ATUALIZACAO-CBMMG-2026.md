# Relatório de atualização — CBMMG — 2026

## 1. Escopo aplicado
Atualização institucional do Corpo de Bombeiros Militar de Minas Gerais (CBMMG/BMMG), com dados de cabeçalho, histórico, concursos, direitos, associações, ações judiciais e remuneração tabelada seguindo o padrão de PMESP.

## 2. Campos revisados
- Chave institucional: `bmmg`, com exibição pública `CBMMG`.
- UF Minas Gerais: inclusão do vínculo de bombeiro militar no seletor de estados.
- Resumo institucional: criação, comando, estrutura, emergência, fontes, população e relação ativo/população.
- Números estimativos: efetivo ativo, população e relação marcados com `(estimado)` quando aplicável.
- Remuneração tabelada: tabela por posto/graduação com referência 2026, valores de ingresso do CFO/CFSd e fonte MG/SEPLAG/CBMMG.
- Direitos: IPSM, ajuda de custo, abono fardamento, vantagens condicionadas e cautelas previdenciárias.
- Concursos: editais CBMMG nº 09/2026 e nº 10/2026.
- Associações: ASPRA/PMBM-MG, AOPMBM-MG e IPSM como canal institucional.
- Ações judiciais: revisão 5,4%, ajuda alimentação, IPSM/contribuição e promoção/enquadramento.

## 3. Arquivos alterados
- `js/data/portal-config.js`
- `js/ui/header-estados.js`
- `js/data/parametros-cargos.js`
- `js/services/remuneracao.js`
- `js/services/direitos.js`
- `js/ui/navegacao-ui.js`
- `js/data/concursos-data.js`
- `js/data/associacoes-data.js`
- `js/data/acoes-judiciais-data.js`
- `docs/RELATORIO-ATUALIZACAO-CBMMG-2026.md`

## 4. Validação técnica
Executado `node --check` nos arquivos JavaScript alterados:
- `js/data/portal-config.js` — OK
- `js/ui/header-estados.js` — OK
- `js/data/parametros-cargos.js` — OK
- `js/services/remuneracao.js` — OK
- `js/services/direitos.js` — OK
- `js/ui/navegacao-ui.js` — OK
- `js/data/concursos-data.js` — OK
- `js/data/associacoes-data.js` — OK
- `js/data/acoes-judiciais-data.js` — OK

## 5. Fontes de referência
- CBMMG — portal oficial e concursos.
- Governo de Minas Gerais — página institucional do CBMMG.
- ALMG — Lei MG nº 25.804/2026 e Decreto MG nº 49.006/2025.
- MG/SEPLAG — Grupo XI — Defesa Social.
- Editais CBMMG nº 09/2026 e nº 10/2026.
- IBGE — estimativa populacional 2025.
- IDECAN — banca dos editais CBMMG 2026.

## 6. Observações de cautela
- Efetivo ativo foi cadastrado como estimativa e sinalizado no rótulo.
- Reserva/inativos e efetivo feminino permanecem como dados em breve ou efetivo legal quando não havia número consolidado seguro.
- Remuneração não inclui automaticamente ajuda de custo, abono fardamento, diárias, indenizações, rubricas pessoais, retroativos ou adicionais condicionados.
- Qualquer cálculo individual deve ser conferido por contracheque, ficha funcional e ato oficial.
