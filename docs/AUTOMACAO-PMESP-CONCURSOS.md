# Automação piloto — PMESP / Concursos

Esta automação atualiza o arquivo:

```text
data/concursos/pmesp.json
```

A página `concursos.html` lê esse arquivo por meio de:

```text
js/pages/concursos-automacao-pmesp.js
```

## Modo econômico

A automação foi ajustada para reduzir custo antes de replicar para outras instituições.

Agora ela faz assim:

```text
1. O GitHub Actions busca páginas oficiais da PMESP/Vunesp sem usar OpenAI.
2. O script gera um hash das fontes oficiais monitoradas.
3. Se nada mudou e a última pesquisa completa ainda está dentro do prazo, a OpenAI não é chamada.
4. Se houver mudança, ou se vencer o prazo de revalidação, a OpenAI é chamada com modelo barato.
5. Por padrão, a automação NÃO usa web_search da OpenAI.
```

Isso reduz custo porque a maior parte das execuções recorrentes vira apenas uma checagem de fontes, sem gasto na API.

## Arquivos principais

```text
.github/workflows/atualizar-pmesp-concursos.yml
scripts/atualizar-pmesp-concursos.mjs
data/concursos/pmesp.json
data/concursos/pmesp-monitor.json
```

`pmesp-monitor.json` é criado automaticamente na primeira execução após esta atualização. Ele guarda os hashes das fontes monitoradas e ajuda a decidir se vale chamar a IA.

## Como rodar manualmente

1. Abra o repositório no GitHub.
2. Vá na aba **Actions**.
3. Abra o workflow **Atualizar PMESP - Concursos**.
4. Clique em **Run workflow**.
5. Use as opções:

```text
forcar_atualizacao: false
usar_web_search: false
```

Essas são as opções econômicas.

Use `forcar_atualizacao: true` apenas quando quiser obrigar uma nova pesquisa com IA.

Use `usar_web_search: true` apenas quando a coleta das fontes oficiais não for suficiente, porque isso pode aumentar o custo.

## Frequência automática

O workflow agora roda automaticamente apenas:

```text
segunda-feira às 07h00 de Brasília
```

O GitHub Actions usa UTC, por isso o cron está como:

```text
0 10 * * 1
```

Mesmo nessa execução semanal, a OpenAI só será chamada se:

```text
- houver mudança nas fontes oficiais monitoradas; ou
- a última pesquisa completa tiver mais de 14 dias; ou
- você rodar manualmente com forcar_atualizacao = true.
```

## Variáveis opcionais do GitHub

Em **Settings → Secrets and variables → Actions → Variables**, você pode ajustar:

```text
OPENAI_MODEL
```

Valor econômico recomendado:

```text
gpt-5.4-nano
```

Valor mais seguro, mas mais caro:

```text
gpt-5.4-mini
```

O segredo obrigatório continua sendo:

```text
OPENAI_API_KEY
```
