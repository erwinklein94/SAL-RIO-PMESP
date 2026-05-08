# Relatório de atualização — CBMMS — 2026

## 1. Escopo aplicado
Inclusão do Corpo de Bombeiros Militar de Mato Grosso do Sul (CBMMS) no portal UniSegPub, replicando o padrão institucional da PMESP.

## 2. Campos revisados
- Chave institucional: `bmms`.
- Resumo institucional: origem, comando, sede, emergência, efetivo legal, população, relação efetivo/população, fontes e atualização.
- Remuneração: tabela detalhada por posto/graduação e nível, com RGA 2026 aplicada e observações de rubricas não somadas.
- Concursos: QPTBM/2025 e monitoramento de concursos.ms.gov.br.
- Direitos, associações e ações judiciais: textos cautelosos, sem promessa de direito automático.

## 3. Arquivos alterados
- `js/data/portal-config.js`
- `js/ui/header-estados.js`
- `brasoes-mapeados-webp.json`
- `js/data/parametros-cargos.js`
- `js/services/remuneracao.js`
- `js/services/direitos.js`
- `js/data/concursos-data.js`
- `js/data/associacoes-data.js`
- `js/data/acoes-judiciais-data.js`
- `js/ui/navegacao-ui.js`

## 4. Validação técnica
Executar `node --check` nos arquivos JS alterados.

## 5. Fontes de referência
CBMMS; Governo de Mato Grosso do Sul; Portal da Legislação MS; Normas internas CBMMS; LC MS nº 127/2008; LC MS nº 188/2014; LC MS nº 291/2021; LC MS nº 354/2025; Lei MS nº 6.562/2026; IBGE 2025; concursos.ms.gov.br.

## 6. Observações de cautela
Efetivo ativo operacional não foi inferido. O portal exibe 3.978 como efetivo legal/cargos fixados em lei. População e relação aparecem com indicação “(estimado)”. Remuneração individual deve ser conferida no contracheque.
