# Etapa 16 — Qualidade editorial da automação de concursos

Esta etapa melhora o motor genérico de concursos para evitar conteúdo raso, genérico ou prejudicial ao site.

## O problema resolvido

A automação econômica conseguia atualizar arquivos, mas podia gerar campos como:

- "conferir edital vigente"
- "consultar página oficial"
- "conforme edital específico"
- "não encontrado em fonte oficial"

Essas respostas são seguras, mas fracas para o usuário. A partir desta etapa, elas passam a contar negativamente na avaliação de qualidade.

## O que mudou

### 1. Score de qualidade mais rígido

O script agora calcula:

- campos ruins
- campos genéricos
- campos concretos
- campos críticos ruins
- campos críticos genéricos
- score de publicação

Campos críticos:

- edital
- salário
- vagas
- escolaridade
- banca
- etapas

### 2. Frases genéricas são penalizadas

Agora o sistema detecta expressões como:

- conferir edital
- consultar edital
- conforme edital específico
- acompanhar página oficial
- varia conforme
- depende do concurso
- quando previsto

Se muitos campos críticos vierem assim, o JSON principal não é sobrescrito.

### 3. Dados bons antigos são preservados

A regra principal é:

> Nunca substituir um dado concreto já publicado por uma frase genérica.

Exemplo:

Antes:

```text
Salário: R$ 8.505,00
```

Nova pesquisa fraca:

```text
Salário: consultar edital vigente
```

Resultado:

```text
Mantém R$ 8.505,00 e salva alerta.
```

### 4. Modo qualificado

O workflow agora tem o campo:

```text
modo_qualidade
```

Opções:

```text
economico
qualificado
```

O modo econômico é para monitorar sem custo alto.

O modo qualificado usa modelo melhor e web search para tentar melhorar conteúdo de uma instituição específica.

## Como usar no GitHub Actions

### Rotina econômica normal

Use para monitorar lotes:

```text
instituicao: prioridade_1 ou prioridade_2
limite: 1, 3 ou 5
forcar_atualizacao: false
usar_web_search: false
modo_qualidade: economico
```

### Melhorar uma instituição fraca

Use uma por vez:

```text
instituicao: pmsc
limite: 1
forcar_atualizacao: true
usar_web_search: true
modo_qualidade: qualificado
```

Esse modo pode gastar mais, mas deve gerar conteúdo melhor. Use apenas nas páginas que precisam de melhoria editorial.

## Quando a automação publica

Publica apenas se:

- score >= 78
- nenhum campo crítico estiver ruim
- no máximo 2 campos críticos estiverem genéricos
- a nova versão não for pior que a anterior

## Quando a automação bloqueia

Se o resultado for fraco, o sistema:

1. Não altera o JSON principal.
2. Mantém o conteúdo publicado atual.
3. Salva o resultado em:

```text
data/concursos/_rascunhos/{instituicao}.json
```

4. Registra motivo no arquivo de monitoramento.

## Fluxo recomendado para melhorar qualidade

1. Escolha uma instituição que ficou genérica no site.
2. Rode em modo qualificado com `forcar_atualizacao: true`.
3. Veja se o JSON principal melhorou.
4. Se bloquear, abra o rascunho e revise manualmente.
5. Só depois rode outra instituição.

Não rode todas as instituições em modo qualificado de uma vez.
