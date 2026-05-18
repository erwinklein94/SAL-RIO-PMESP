# Etapa 19 — resultado pago precisa aparecer no site

Esta correção resolve dois pontos:

1. O back-end agora prioriza o resultado gerado pela OpenAI no modo qualificado pago.
2. O front-end agora aceita JSON com `qualidade_publicacao: baixa` quando ele foi publicado pelo modo qualificado pago.

## Antes

```text
modo_qualidade: qualificado
+ OpenAI/web_search usado
+ score baixo
= monitor dizia publicado
= mas o site podia continuar mostrando dados antigos
```

Isso acontecia por dois motivos:

- o script ainda preservava muitos campos antigos quando a resposta era considerada genérica;
- o JavaScript do site podia ignorar JSON com qualidade baixa.

## Agora

```text
modo_qualidade: qualificado
+ OpenAI/web_search usado
= resultado pago tem prioridade no JSON principal
= JSON recebe forcar_exibicao_site: true
= front-end exibe o JSON publicado
```

## Segurança mantida

O sistema só preserva campo antigo quando o campo novo vier vazio ou como `não encontrado`.

Quando o resultado for exibido por uso pago, o JSON fica marcado com:

```json
"publicado_por_modo_qualificado": true,
"forcar_exibicao_site": true,
"publicacao_forcada_por_credito_openai": true,
"precisa_revisao_humana": true
```

## Como testar

Rode uma instituição por vez:

```text
instituicao: pmsc
limite: 1
forcar_atualizacao: true
usar_web_search: true
modo_qualidade: qualificado
```

Depois confira:

```text
data/concursos/pmsc.json
```

Ele precisa conter:

```json
"forcar_exibicao_site": true
```

Depois abra o site e pressione:

```text
Ctrl + F5
```
