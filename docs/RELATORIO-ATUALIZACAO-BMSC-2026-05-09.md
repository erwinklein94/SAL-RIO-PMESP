# Relatório de atualização — CBMSC/BMSC — 09/05/2026

## 1. Escopo aplicado
Atualização institucional do Corpo de Bombeiros Militar de Santa Catarina no portal UniSegPub, com chave `bmsc`, mantendo o padrão usado para PMESP/CBPMESP e sem criar vitrine de produtos exclusiva.

## 2. Campos revisados
- Cadastro institucional: `bmsc` incluído como instituição válida e vinculado ao estado de Santa Catarina no seletor de bombeiros.
- Cabeçalho/resumo: nome oficial, sigla pública `CBMSC`, sigla interna `BMSC`, UF, natureza, criação, sede, emergência 193, comando, estrutura, fontes e links oficiais.
- Efetivo: usado `5.000 profissionais (estimado/projeção centenário)` porque a fonte pública localizada indica projeção institucional, não quadro ativo consolidado por posto. Reserva e efetivo feminino ficaram como `Dados em breve`.
- População/relação: população SC 2025 cadastrada como 8.187.029; relação exibida como estimada porque usa projeção de efetivo.
- Histórico: origem, criador/ato e marcos históricos do CBMSC, incluindo autorização legal, instalação em 26/09/1926, autonomia e reorganização recente.
- Remuneração tabelada: criada tabela detalhada `CARGOS_BMSC` e `REMUNERACAO_SP_OFICIAL.bmsc`, com valores oficiais dos editais CFP/CFO 2026 e valores derivados marcados como `(estimado)`/`Abr/2026 estimado`.
- Direitos: incluídos saúde/assistência, tempo de serviço, insalubridade/periculosidade, auxílio-alimentação, subsídio/reajuste, SEMET/QOE, diárias e indenizações.
- Concursos: incluídos editais CBMSC/IDIB 001/2026 e 002/2026, vagas, remuneração, requisitos e etapas.
- Associações: incluídas APRASC e ACORS como entidades de referência para militares estaduais de SC.
- Ações judiciais: incluídos temas de conferência remuneratória, auxílio-alimentação, promoções/enquadramento, SEMET/QOE, reserva/reforma e diárias/indenizações.

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
- `docs/RELATORIO-ATUALIZACAO-BMSC-2026-05-09.md`

## 4. Validação técnica
Executado `node --check` nos arquivos JavaScript alterados:

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
- CBMSC — História institucional: https://www.cbm.sc.gov.br/index.php/sobre-o-cbmsc/historia
- CBMSC — Concurso 2026 CFO/CFP: https://www.cbm.sc.gov.br/index.php/blog-de-noticias/com-salarios-de-ate-r-21-mil-corpo-de-bombeiros-de-santa-catarina-abre-inscricoes-para-concurso-nesta-quarta
- CBMSC — Comandante-Geral Cel BM Fabiano de Souza: https://www.cbm.sc.gov.br/index.php/blog-de-noticias/comandante-geral-do-cbmsc-e-eleito-presidente-da-conselho-nacional-dos-corpos-de-bombeiros-militares-do-brasil
- ALESC — LC SC 765/2020: https://leis.alesc.sc.gov.br/ato-normativo/20899
- ALESC — LC SC 872/2025: https://leis.alesc.sc.gov.br/ato-normativo/22843
- ALESC — LC SC 880/2025: https://leis.alesc.sc.gov.br/ato-normativo/23033
- ALESC — Lei SC 18.796/2023 / auxílio-alimentação: https://leis.alesc.sc.gov.br/ato-normativo/22251
- IBGE — Estimativas de população 2025: https://ftp.ibge.gov.br/Estimativas_de_Populacao/Estimativas_2025/estimativa_dou_2025.pdf
- Governo de SC / Portal da Transparência: https://www.transparencia.sc.gov.br/

## 6. Observações de cautela
- Não foi inferido efetivo ativo consolidado por carreira quando a fonte pública não trazia quadro fechado; por isso a projeção aparece como `(estimado/projeção)`.
- Valores da aba de remuneração marcados como `(estimado)` devem ser conferidos em tabela oficial consolidada ou contracheque individual.
- Auxílio-alimentação foi destacado como verba informativa/indenizatória e não somado automaticamente ao bruto.
- Produtos/vitrine não foram alterados por não haver pedido de produto exclusivo do CBMSC.
