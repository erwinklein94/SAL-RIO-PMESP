# Relatório de atualização — PCCE — 2026

## 1. Escopo aplicado
Atualização institucional da Polícia Civil do Estado do Ceará (PCCE), replicando o padrão de cadastro, histórico, cargos, remuneração, concursos, direitos, associações e ações judiciais usado para a PMESP no portal UniSegPub.

## 2. Campos revisados
- Inclusão da chave `pcce` em instituições válidas, mapas de navegação e tabelas de cargos.
- Revisão do resumo institucional com origem histórica em 10/05/1808, comando atual, sede CISP, emergência, estrutura, fontes e cautelas.
- Inclusão do histórico narrativo e marcos legais da PCCE, com Estatuto da Polícia Civil, reorganização de direção e leis recentes do Oficial Investigador.
- Cadastro de remuneração tabelada para Delegado e Oficial Investigador, com valores oficiais de edital e estimativas sinalizadas quando derivadas de tabela remuneratória.
- Cadastro dos concursos Delegado PCCE/Cebraspe 2025 e Oficial Investigador/CEV-UECE 2025/2026.
- Inclusão de direitos, saúde, previdência, vantagens, associações e ações judiciais cabíveis.

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
- `docs/RELATORIO-ATUALIZACAO-PCCE-2026.md`

## 4. Validação técnica
Executar `node --check` em todos os arquivos JavaScript alterados e, preferencialmente, em todos os JS do projeto antes da publicação.

## 5. Fontes de referência
- Polícia Civil do Ceará — institucional, quem é quem, contatos e estrutura.
- SSPDS/CE — histórico, notícias e atos de segurança pública.
- CEV/UECE — concurso Oficial Investigador PCCE 2025/2026.
- Cebraspe — concurso Delegado PCCE 2025.
- DOE/CE e ALECE — leis e tabelas remuneratórias.
- Lei CE nº 12.124/1993; Lei CE nº 14.868/2011; Lei CE nº 19.128/2024; Lei CE nº 19.186/2025; Lei CE nº 19.706/2026; Decreto CE nº 35.521/2023.

## 6. Observações de cautela
- Efetivo ativo, inativos e mulheres foram mantidos como estimativas até publicação oficial consolidada.
- Valores remuneratórios sem confirmação direta no edital ou na tabela aberta foram marcados como estimados.
- Plantões, adicional noturno, diárias, funções, auxílios, retroativos, previdência e parcelas pessoais não foram somados automaticamente.
- A criação de cargos pela Lei CE nº 19.706/2026 não equivale a posse automática; depende de atos oficiais, curso de formação, classificação, cotas e disponibilidade administrativa.
