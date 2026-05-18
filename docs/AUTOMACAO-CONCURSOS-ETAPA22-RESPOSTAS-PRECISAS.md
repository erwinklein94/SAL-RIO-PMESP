# Etapa 22 — Respostas precisas para usuário final

Esta etapa endurece o prompt e o pós-processamento da automação de concursos.

## Problema resolvido

A pesquisa qualificada ainda devolvia frases ruins para experiência do usuário, como:

- conferir edital;
- consultar página oficial;
- conforme edital específico;
- varia por edital.

Essas frases foram tratadas como proibidas para campos visíveis do site.

## Nova regra editorial

O usuário do site não deve receber uma tarefa. Ele deve receber a resposta.

Exemplos desejados:

```text
Salário: R$ 5.000,00.
Altura mínima: 1,65 m homem e 1,60 m mulher.
Vagas: 250 vagas + cadastro reserva.
Banca: Cebraspe.
```

Exemplos proibidos:

```text
Conferir edital vigente.
Consultar página oficial.
Conforme edital específico.
Depende do edital.
```

## Como o prompt foi alterado

O modo qualificado agora instrui a IA a:

1. pesquisar de forma profunda com web_search;
2. usar a internet inteira como pista;
3. preferir fontes oficiais, banca, diário oficial e governo;
4. aceitar fonte auxiliar quando necessário, marcando revisão;
5. entregar respostas curtas, diretas e com números;
6. nunca transferir o trabalho ao usuário final.

## Campos com instrução específica

- salário: valores em R$ por cargo;
- vagas: quantidade exata e cargo;
- idade: idade, altura mínima, CNH e requisitos físicos;
- escolaridade: nível ou curso exigido;
- banca: nome direto;
- etapas: lista objetiva de fases;
- validade: prazo direto;
- previsão: próximo passo claro.

## Configuração recomendada para melhorar páginas ruins

```text
instituicao: pmsc
limite: 1
forcar_atualizacao: true
usar_web_search: true
modo_qualidade: qualificado
```

O workflow passa a usar:

```text
WEB_SEARCH_CONTEXT_QUALIDADE: high
PERMITIR_FONTES_AUXILIARES_QUALIFICADAS: true
```

Isso aumenta custo por pesquisa qualificada, mas é o modo correto para melhorar páginas importantes.
