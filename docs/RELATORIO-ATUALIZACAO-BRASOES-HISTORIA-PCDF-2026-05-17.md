# Relatório — Atualização da aba Brasões e História — PCDF

Data: 2026-05-17

## Arquivo-base

- `brasao-historia-pcdf-2026-05-15(1).md`

## Alterações aplicadas

- Atualizado o card estático da PCDF em `brasoes.html` com esfera `estadual`, UF `DF`, ramo `Polícia Civil`, brasão `img/CIVIL/pcdf.webp` e texto institucional do anexo.
- Atualizado `js/data/brasoes-historia-pcdf.js` com detalhamento completo da PCDF: indicadores, origem, trajetória histórica, símbolos, linha do tempo, chefias, medalhas, denominações sucessivas, estrutura atual, base normativa e fontes consultadas.
- Atualizado o renderer especial de brasões em `js/ui/header-estados.js` para exibir seções complementares (`secoes_extra`) e lista de fontes (`fontes_consultadas`) quando presentes no objeto detalhado.
- Atualizado o cache-buster do script `brasoes-historia-pcdf.js` em `brasoes.html` para `v=20260517pcdf2`.

## Validações

- A PCDF permanece classificada como `data-esfera="estadual"` e `data-uf="DF"`.
- A imagem esperada `img/CIVIL/pcdf.webp` existe no projeto.
- Os arquivos JavaScript alterados foram validados com `node --check`.
