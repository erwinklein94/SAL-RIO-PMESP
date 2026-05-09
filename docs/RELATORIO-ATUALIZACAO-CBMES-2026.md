# Relatório de atualização — CBMES 2026

## 1. Escopo aplicado
Atualização institucional do Corpo de Bombeiros Militar do Estado do Espírito Santo (`bmes`/CBMES), seguindo o padrão de dossiê institucional aplicado à PMESP e preservando o restante do projeto.

## 2. Campos revisados
- Inclusão da chave `bmes` no conjunto de instituições válidas.
- Vinculação do CBMES ao estado do Espírito Santo no seletor de UFs.
- Cadastro de identificação curta, brasão, resumo institucional, comando, sede, emergência, links oficiais, fonte e data de revisão.
- Histórico institucional com origem em 1912, primeira estrutura de 1913, evolução da corporação e autonomia constitucional estadual.
- Tabela de cargos `CARGOS_BMES` com postos/graduações, referências, valores oficiais de 12/2025, linhas de CFO 2026 e destaques de oficiais superiores pela Lei ES 12.783/2026.
- Aba de remuneração tabelada oficial `REMUNERACAO_SP_OFICIAL.bmes`, com descrição de bruto, benefícios não somados e badges de referência.
- Regras de direitos: saúde/assistência, subsídio, auxílio-alimentação, serviço extraordinário, fardamento, promoções, insalubridade, periculosidade e base legal.
- Dados de concurso: CFO 2026/IDECAN, vagas, remuneração, cotas, requisitos, etapas, validade e site oficial.
- Associações e entidades: ABMES, ASPRA-ES e ASSOMES.
- Ações judiciais cabíveis: subsídio/enquadramento, CFO 2026, GSE, verbas indenizatórias, promoção/quadro e reserva/reforma/pensão.

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
- `docs/RELATORIO-ATUALIZACAO-CBMES-2026.md`

## 4. Validação técnica
Executado `node --check` nos arquivos JS alterados:

- `js/data/portal-config.js` — OK
- `js/ui/header-estados.js` — OK
- `js/data/parametros-cargos.js` — OK
- `js/services/remuneracao.js` — OK
- `js/services/direitos.js` — OK
- `js/data/concursos-data.js` — OK
- `js/data/associacoes-data.js` — OK
- `js/data/acoes-judiciais-data.js` — OK
- `js/ui/navegacao-ui.js` — OK

## 5. Fontes de referência
- Portal oficial do CBMES — História, Comandante-Geral, CFO 2026 e endereço institucional.
- Edital de Abertura nº 001/2026 — CFO CBMES/IDECAN.
- PMES — legislação estadual dos militares estaduais do Espírito Santo.
- ALEES — Lei ES 11.985/2023 e Lei ES 12.783/2026.
- Governo do Espírito Santo — competências do CBMES.
- IBGE — dados estaduais do Espírito Santo.
- Entidades de classe: ABMES, ASPRA-ES e ASSOMES.

## 6. Observações de cautela
- Efetivo ativo real não foi inferido. O campo usa quadro legal/projetado como estimativa quando não há consolidação oficial direta disponível no portal.
- Valores de remuneração de 12/2025 seguem tabela PM/CBM e edital CFO 2026; linhas 2026 de oficiais superiores foram destacadas separadamente.
- Auxílio-alimentação, GSE, fardamento, diárias, indenizações e rubricas pessoais não foram somados automaticamente ao bruto.
- Ações judiciais foram cadastradas como hipóteses de análise; não indicam ganho automático.
