# Correção da automação de concursos — proteção de qualidade

Esta correção impede que a automação substitua dados úteis por campos como "não encontrado em fonte oficial".

## O que mudou

1. O front-end (`js/pages/concursos-automacao.js`) ignora JSONs de baixa qualidade e mantém os dados estáticos do site.
2. O script (`scripts/atualizar-concursos.mjs`) agora mescla dados novos com dados anteriores.
3. Se a atualização vier fraca, o JSON principal não é sobrescrito.
4. Rascunhos ruins são salvos em `data/concursos/_rascunhos/{id}.json` para revisão.
5. O workflow agora comita também subpastas dentro de `data/concursos`.
6. Os arquivos `pmesp.json`, `pcsp.json` e `prf.json` foram restaurados com os dados bons da base estática.

## Regra principal

A automação só publica quando a qualidade mínima for atingida. Caso contrário, preserva a versão anterior.
