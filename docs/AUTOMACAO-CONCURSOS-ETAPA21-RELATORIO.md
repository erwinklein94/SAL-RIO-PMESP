# Etapa 21 — Relatório automático de qualidade e fila de ações

Esta etapa cria uma triagem automática para você não precisar abrir cada instituição no site manualmente.

## Arquivos criados

```text
scripts/gerar-relatorio-concursos.mjs
.github/workflows/relatorio-concursos.yml
docs/RELATORIO-CONCURSOS.md
relatorio-concursos.html
data/concursos/_relatorio-qualidade.json
```

Os três últimos são gerados automaticamente pelo workflow.

## O que o relatório faz

O script lê:

```text
config/concursos-instituicoes.json
data/concursos/{instituicao}.json
data/concursos/{instituicao}-monitor.json
data/concursos/_rascunhos/{instituicao}.json
```

Depois calcula:

```text
score de qualidade
campos ruins
campos genéricos
campos concretos
campos críticos ruins
campos críticos genéricos
fonte direta falhou
se existe rascunho
se precisa modo qualificado
```

## Ações geradas

O relatório classifica cada instituição em uma destas ações:

```text
rodar_qualificado
revisar_rascunho_ou_site
revisar_ou_rodar_qualificado
rodar_economico
criar_json_inicial
ok
```

## Como usar

### 1. Rodar relatório manualmente

No GitHub Actions:

```text
Actions → Relatório de Qualidade - Concursos → Run workflow
```

Depois abra:

```text
docs/RELATORIO-CONCURSOS.md
```

ou no site:

```text
relatorio-concursos.html
```

### 2. Ver quem precisa de modo qualificado

Procure a ação:

```text
rodar_qualificado
```

O relatório mostrará exatamente o workflow sugerido, por exemplo:

```text
instituicao=pmsc; modo=qualificado; web=true; forcar=true
```

### 3. Rodar modo qualificado só nas sinalizadas

Use uma por vez:

```text
instituicao: pmsc
limite: 1
forcar_atualizacao: true
usar_web_search: true
modo_qualidade: qualificado
```

## Fluxo recomendado

### Segunda-feira

```text
Atualizar Concursos - Motor Genérico
instituicao: prioridade_1
limite: 10
modo_qualidade: economico
```

Esse workflow agora gera o relatório ao final.

### Depois

Abra:

```text
docs/RELATORIO-CONCURSOS.md
```

ou:

```text
relatorio-concursos.html
```

### Em seguida

Rode modo qualificado só nas instituições marcadas como:

```text
rodar_qualificado
```

## Regra principal

Você não precisa mais olhar instituição por instituição no site.

Agora o fluxo é:

```text
modo econômico em lote
→ relatório automático
→ modo qualificado só nas sinalizadas
→ revisão humana só onde o relatório mandar
```
