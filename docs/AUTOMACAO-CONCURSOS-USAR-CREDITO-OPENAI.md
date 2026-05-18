# Etapa 18 — usar resultado quando houver gasto com OpenAI

Esta correção muda a regra de publicação no modo qualificado.

## Antes

```text
modo_qualidade = qualificado
+ OpenAI/web_search usado
+ score baixo
= resultado bloqueado
= crédito gasto sem alterar o site
```

## Agora

```text
modo_qualidade = qualificado
+ OpenAI/web_search usado
= o JSON principal é atualizado mesmo que o score fique baixo
= o resultado fica marcado como precisa_revisao_humana
= o monitor registra publicado_por_modo_qualificado = true
```

## Segurança mantida

A automação ainda faz merge com os dados atuais antes de publicar.

Isso significa:

```text
campo novo útil → entra no site
campo novo genérico → tenta preservar dado antigo melhor
resultado final → publica com alerta de revisão humana
```

## Quando usar

Use somente uma instituição por vez:

```text
instituicao: pmsc
limite: 1
forcar_atualizacao: true
usar_web_search: true
modo_qualidade: qualificado
```

## O que muda no monitor

O arquivo `data/concursos/{id}-monitor.json` poderá mostrar:

```json
"publicacao_bloqueada": false,
"publicado_por_modo_qualificado": true,
"qualidade_publicacao": "baixa",
"score_publicacao": 63
```

Isso significa que houve publicação porque a pesquisa qualificada usou crédito da OpenAI.
