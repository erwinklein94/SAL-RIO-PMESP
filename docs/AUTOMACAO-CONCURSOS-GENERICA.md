# Automação genérica de concursos — Universo Seg Pub

Esta etapa transforma o piloto `PMESP → Concursos` em um motor genérico para várias instituições.

## Arquivos principais

```text
config/concursos-instituicoes.json
scripts/atualizar-concursos.mjs
.github/workflows/atualizar-concursos.yml
js/pages/concursos-automacao.js
data/concursos/{id}.json
```

## Como funciona

1. O GitHub Actions recebe uma instituição, por exemplo `pcsp`.
2. O script lê `config/concursos-instituicoes.json`.
3. O script consulta fontes oficiais sem usar OpenAI.
4. Ele compara hashes das páginas monitoradas.
5. Se nada mudou e a revalidação não venceu, a OpenAI não é chamada.
6. Se mudou, a OpenAI gera o JSON atualizado.
7. O arquivo `data/concursos/{id}.json` é atualizado.
8. O site lê esse JSON pelo arquivo `js/pages/concursos-automacao.js`.

## Instituições configuradas nesta etapa

```text
pmesp
pcsp
prf
pf
pmerj
pcerj
pmmg
pcmg
pmba
pcba
```

As novas instituições foram incluídas com JSON inicial protegido. Se uma atualização automática vier com muitos campos sem confirmação, o script salva o resultado em `data/concursos/_rascunhos/` e mantém o JSON principal publicado.

## Como rodar manualmente

No GitHub:

```text
Actions → Atualizar Concursos - Motor Genérico → Run workflow
```

Use primeiro:

```text
instituicao: pmesp
limite: 1
forcar_atualizacao: false
usar_web_search: false
```

Depois teste:

```text
instituicao: pcsp
limite: 1
forcar_atualizacao: false
usar_web_search: false
```

E depois:

```text
instituicao: prf
limite: 1
forcar_atualizacao: false
usar_web_search: false
```

Depois de validar as três primeiras, teste uma por vez:

```text
instituicao: pf
instituicao: pmerj
instituicao: pcerj
instituicao: pmmg
instituicao: pcmg
instituicao: pmba
instituicao: pcba
```

Sempre mantenha:

```text
limite: 1
forcar_atualizacao: false
usar_web_search: false
```

## Como adicionar nova instituição

1. Crie um arquivo inicial:

```text
data/concursos/novo-id.json
```

2. Adicione o cadastro em:

```text
config/concursos-instituicoes.json
```

3. Inclua fontes oficiais, domínios oficiais e termos relevantes.

4. No workflow, se quiser aparecer como opção manual fixa, adicione o novo ID em:

```text
.github/workflows/atualizar-concursos.yml
```

No campo:

```yaml
options:
```

## Regras de custo

- Deixe `usar_web_search` como `false` por padrão.
- Deixe `forcar_atualizacao` como `false` por padrão.
- Rode uma instituição por vez até validar custos.
- Use `prioridade_1` ou `todas_configuradas` só depois que o monitoramento estiver estável.

## Campos obrigatórios do JSON

```text
instituicao_id
instituicao_nome
sigla
uf
tema
status
titulo
resumo
edital
salario
vagas
cotas
idade
escolaridade
materias
banca
inscritos
etapas
cfsd
estagio
validade
previsao
site
fontes
ultima_pesquisa
nivel_confianca
precisa_revisao_humana
alertas
```
