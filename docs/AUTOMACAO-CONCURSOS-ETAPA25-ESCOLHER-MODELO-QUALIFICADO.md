# Etapa 25 — Escolher modelo OpenAI no modo qualificado

Esta etapa adiciona no GitHub Actions um seletor de modelo para pesquisas qualificadas.

## O que mudou

No workflow `Atualizar Concursos - Motor Genérico`, foi adicionado o campo:

```text
modelo_qualificado
```

Opções disponíveis:

```text
gpt-5.4-mini
gpt-5.4
gpt-5.5
```

## Como funciona

O modelo escolhido só é usado quando:

```text
modo_qualidade: qualificado
```

No modo econômico, o sistema continua usando o modelo econômico configurado em:

```text
OPENAI_MODEL
```

## Uso recomendado

### Custo menor

```text
modo_qualidade: qualificado
modelo_qualificado: gpt-5.4-mini
```

Use quando quiser uma melhoria moderada e ainda controlar custo.

### Qualidade maior

```text
modo_qualidade: qualificado
modelo_qualificado: gpt-5.4
```

Use quando a instituição é importante ou o resultado do mini ficou fraco.

### Máxima qualidade / mais caro

```text
modo_qualidade: qualificado
modelo_qualificado: gpt-5.5
```

Use em poucas instituições por vez, principalmente para:

```text
prioridade_1
instituições com muito acesso
pesquisa inicial difícil
páginas que ficaram genéricas mesmo após modo qualificado comum
```

## Exemplo prático

```text
instituicao: pmsc
limite: 1
forcar_atualizacao: true
usar_web_search: true
modo_qualidade: qualificado
modelo_qualificado: gpt-5.5
```

## Onde conferir depois

O modelo usado aparece no arquivo de monitoramento da instituição:

```text
data/concursos/{instituicao}-monitor.json
```

Exemplo:

```json
"modelo": "gpt-5.5"
```

## Atenção

Não rode `prioridade_3` com limite alto usando `gpt-5.5` logo de início. Use lote pequeno, como 1, 3 ou 5, para medir custo e qualidade.
