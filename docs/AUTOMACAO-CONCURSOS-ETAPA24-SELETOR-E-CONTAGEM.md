# Etapa 24 — Seletor reorganizado e contagem correta da aba Concursos

Esta etapa corrige dois pontos visuais da aba `concursos.html`:

1. O seletor de instituições passa a ser reconstruído automaticamente com base em `config/concursos-instituicoes.json`.
2. A contagem exibida na página deixa de mostrar 46 e passa a mostrar o total real configurado, hoje 110 instituições.

## O que mudou no seletor

Antes, as instituições faltantes eram apenas adicionadas no final do `<select>`, fora dos grupos de UF. Agora o JavaScript reconstrói o seletor inteiro:

- União / Federal;
- AC, AL, AM, AP... até TO;
- dentro de cada UF, ordena por tipo: PM, Bombeiro, PC e Polícia Penal;
- mantém `data-esfera`, `data-uf` e `data-tipo` em cada opção;
- remove duplicidades.

## O que mudou na contagem

Agora o sistema atualiza automaticamente:

- `46 cards` → `110 cards`;
- `46 instituições encontradas` → `110 instituições encontradas`;
- card estatístico `Instituições com resumo` → `110`.

A contagem vem de `config/concursos-instituicoes.json`, que é a fonte de verdade da cobertura de concursos.

## Arquivo alterado

```text
js/pages/concursos-automacao.js
```

Não é necessário editar manualmente o HTML da página para corrigir esses dois pontos.
