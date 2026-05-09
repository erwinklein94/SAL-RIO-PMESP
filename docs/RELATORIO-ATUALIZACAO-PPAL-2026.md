# Relatório de Atualização — PPAL — 2026

## 1. Escopo aplicado
Atualização institucional da Polícia Penal do Estado de Alagoas (PPAL), seguindo o padrão de ficha, remuneração, direitos, concursos, associações e ações usado para a PMESP.

## 2. Campos revisados
- Incluída a chave `ppal` na lista de instituições válidas.
- Vinculada a Polícia Penal ao estado de Alagoas nos mapas de cabeçalho e seleção por UF.
- Atualizado resumo institucional com SERIS/AL, comando, sede, população carcerária e relação efetivo/presos com marcação de estimativas.
- Incluído histórico institucional e marcos legais: Lei AL 7.993/2018, Lei AL 8.650/2022, EC 104/2019 e Lei AL 9.849/2026.
- Criada ficha completa em `POLICIAS_PENAIS_INFO.ppal`.
- Criada tabela `CARGOS_PPAL` com subsídios por Nível I a IV e Classes A a G, conforme Lei AL 9.849/2026.
- Atualizados concursos, direitos, associações e ações judiciais para a PPAL.

## 3. Arquivos alterados
- `js/data/portal-config.js`
- `js/ui/header-estados.js`
- `js/data/policia-penal.js`
- `js/services/remuneracao.js`
- `js/services/direitos.js`
- `js/data/concursos-data.js`
- `js/data/associacoes-data.js`
- `js/data/acoes-judiciais-data.js`
- `js/ui/navegacao-ui.js`
- `brasoes-mapeados-webp.json`
- `docs/RELATORIO-ATUALIZACAO-PPAL-2026.md`

## 4. Validação técnica
- Executar `node --check` nos arquivos JavaScript alterados.
- Executar `node --check` em todos os arquivos `.js` do projeto antes de empacotar.

## 5. Fontes de referência
- SERIS/AL — institucional, competência, estrutura, contatos e quem é quem.
- Alagoas Digital — cadastro do órgão SERIS/AL.
- SAPL/ALEAL — Lei AL nº 7.993/2018.
- SAPL/ALEAL — Lei AL nº 8.650/2022.
- SAPL/ALEAL — Lei AL nº 9.849/2026 e Projeto de Lei Ordinária nº 1900/2026.
- SERIS/AL — Mapa da população carcerária atualizado de 30/04/2026 a 04/05/2026.
- Cebraspe — Concurso SERIS/AL 2021.

## 6. Observações de cautela
- Efetivo ativo e efetivo feminino foram mantidos como estimativa quando não localizados em fonte oficial consolidada.
- População usada no resumo: 6.386 presos recolhidos nas unidades prisionais no mapa SERIS de abril/maio de 2026.
- Valores remuneratórios são subsídio oficial por nível/classe; não somar periculosidade, insalubridade, abono, prêmio, verba de representação, gratificações ou parcelas pessoais sem rubrica e base normativa.
- Concurso novo não foi cadastrado como aberto; foi tratado como pedido/previsão quando não havia edital oficial localizado.
