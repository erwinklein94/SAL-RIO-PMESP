# Etapa 26 — Motor simples de pesquisa automatizada de concursos

Esta etapa simplifica a automação de concursos.

## O que mudou

Antes o fluxo tinha muitos controles:

- prioridade_1, prioridade_2, prioridade_3
- modo econômico
- modo qualificado
- web search separado
- força atualização
- modelo econômico e modelo qualificado

Agora o fluxo foi reduzido para quatro escolhas:

```text
grupo_atualizacao
instituicao
quantidade
modelo_openai
```

## Grupos de atualização

### pendentes

Instituições que ainda precisam de primeira pesquisa útil.

Use para criar a base inicial.

### fracas

Instituições que já têm conteúdo, mas o conteúdo está fraco, genérico ou pouco objetivo.

Use para melhorar qualidade.

### fortes

Instituições com conteúdo considerado suficiente.

Use apenas para manutenção.

### todas

Atualiza qualquer instituição, respeitando a quantidade escolhida.

Use com cuidado.

### instituicao

Atualiza uma instituição específica pelo ID, como:

```text
pmesp
pcdf
bmac
```

## Modelos disponíveis

```text
gpt-5.4-mini
gpt-5.4
gpt-5.5
```

O `gpt-5.4-nano` foi removido.

## Regras editoriais obrigatórias

A automação não deve publicar no site frases como:

```text
ver edital
conferir edital
consultar edital
conforme edital
depende do edital
acompanhar site
```

O usuário final deve receber respostas diretas:

```text
Remuneração: R$ 5.000,00.
Vagas: 250 vagas.
Banca: Cebraspe.
Idade: 18 a 30 anos.
Escolaridade: ensino médio completo.
```

Quando a informação não for localizada, o campo deve mostrar:

```text
Não localizado nas fontes consultadas.
```

## Como usar

### Primeira pesquisa das novas instituições

```text
grupo_atualizacao: pendentes
quantidade: 5
modelo_openai: gpt-5.4-mini
```

### Melhorar conteúdo fraco

```text
grupo_atualizacao: fracas
quantidade: 5
modelo_openai: gpt-5.4
```

### Melhorar uma instituição específica com máxima qualidade

```text
grupo_atualizacao: instituicao
instituicao: pmsc
quantidade: 1
modelo_openai: gpt-5.5
```

## Recomendações de custo

Use `gpt-5.4-mini` para lotes maiores.

Use `gpt-5.4` para melhorar grupos pequenos.

Use `gpt-5.5` apenas para uma ou poucas instituições por execução.

O script possui pausa e retentativa em caso de rate limit, mas o ideal é usar `gpt-5.5` com quantidade baixa.
